import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicViewer from '../components/ComicViewer'

import * as Actions from '../actions'

class ComicViewerContainer extends React.Component {

  static propTypes = {
    comicId: PropTypes.number.isRequired,
    episodeId: PropTypes.number.isRequired
  }

  componentDidMount() {
    const { dispatch, comicId, episodeId } = this.props
    dispatch(Actions.fetchComicEpisodePagesIfNeeded(comicId, episodeId))
  }

  onPrevEpisodeClick = () => {

  }

  onNextEpisodeClick = () => {

  }

  render() {
    return (
      <ComicViewer
        pages={ this.props.pages }
        prevEpisodeDisabled={ this.props.prevEpisodeDisabled }
        onPrevEpisodeClick={ this.onPrevEpisodeClick }
        nextEpisodeDisabled={ this.props.nextEpisodeDisabled }
        onNextEpisodeClick={ this.onNextEpisodeClick }
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { comicId, episodeId } = state.comicViewer
  const comic = state.comic.comics.find(comic => comic.id === comicId) || {}
  const episode = comic.episodes.find(episode => episode.id === episodeId) || {}
  const pages = episode.pages

  return {
    comicId,
    episodeId,
    pages
  }
}

export default connect(
  mapStateToProps
)(ComicViewerContainer)
