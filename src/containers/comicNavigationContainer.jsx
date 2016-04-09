import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicNavigation from '../components/ComicNavigation'

import * as Actions from '../actions'

class ComicNavigationContainer extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    comicId: PropTypes.number.isRequired,
    comic: PropTypes.object.isRequired,
    episodes: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comicId !== this.props.comicId) {
      const { dispatch, comicId } = nextProps
      dispatch(Actions.fetchComicItemIfNeeded(comicId))
      dispatch(Actions.fetchComicEpisodesIfNeeded(comicId))
    }
  }

  onCloseClick = () => {
    this.props.dispatch(Actions.hideComicNavigation())
  }

  onFavoriteClick = () => {

  }

  render() {
    return (
      <ComicNavigation
        open={ this.props.open }
        comic={ this.props.comic }
        episodes={ this.props.episodes }
        isFetching={ this.props.isFetching }
        fetchError={ this.props.fetchError }
        onCloseClick={ this.onCloseClick }
        onFavoriteClick={ this.onFavoriteClick }
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { open, comicId } = state.comicNavigation
  const { comics, isFetching, fetchError } = state.comic
  const comic = comics.find(comic => comic.id === comicId) || {}
  const episodes = comic.episodes ? comic.episodes.reverse() : []
  return {
    open,
    comicId,
    comic,
    episodes,
    isFetching,
    fetchError
  }
}

export default connect(
  mapStateToProps
)(ComicNavigationContainer)
