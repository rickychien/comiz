import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicNavigation from '../components/ComicNavigation'

import * as Actions from '../actions'

class ComicNavigationContainer extends React.Component {

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
    this.props.dispatch(Actions.hideComicNavigation())
  }

  onFavoriteClick = () => {
    this.props.dispatch(Actions.toggleFavorite(this.props.comic.id))
  }

  render() {
    return (
      <ComicNavigation
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
  const open = state.comicNavigation.open
  const navComicId = state.comicNavigation.comicId
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
)(ComicNavigationContainer)
