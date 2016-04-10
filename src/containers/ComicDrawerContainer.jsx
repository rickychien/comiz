import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicDrawer from '../components/ComicDrawer'

import * as Actions from '../actions'

class ComicDrawerContainer extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    comic: PropTypes.object.isRequired,
    episodes: PropTypes.array.isRequired,
    favorite: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comic.id !== this.props.comic.id) {
      const { dispatch, comic } = nextProps
      dispatch(Actions.fetchComicItemIfNeeded(comic.id))
      dispatch(Actions.fetchComicEpisodesIfNeeded(comic.id))
    }
  }

  onCloseClick = () => {
    this.props.dispatch(Actions.hideComicDrawer())
  }

  onFavoriteClick = () => {
    this.props.dispatch(Actions.toggleFavorite(this.props.comic.id))
  }

  render() {
    return (
      <ComicDrawer
        open={ this.props.open }
        comic={ this.props.comic }
        episodes={ this.props.episodes }
        favorite={ this.props.favorite }
        isFetching={ this.props.isFetching }
        fetchError={ this.props.fetchError }
        onCloseClick={ this.onCloseClick }
        onFavoriteClick={ this.onFavoriteClick }
      />
    )
  }

}

const mapStateToProps = (state) => {
  const open = state.comicDrawer.open
  const navComicId = state.comicDrawer.comicId
  const { comics, isFetching, fetchError } = state.comic
  const comic = comics.find(comic => comic.id === navComicId) || {}
  const episodes = comic.episodes || []
  const favorite = comic.favorite || false

  return {
    open,
    comic,
    episodes,
    favorite,
    isFetching,
    fetchError
  }
}

export default connect(
  mapStateToProps
)(ComicDrawerContainer)
