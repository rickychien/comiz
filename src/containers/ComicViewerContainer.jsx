import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicViewer from '../components/ComicViewer'

import * as Actions from '../actions'

class ComicViewerContainer extends React.Component {

  static propTypes = {
    comicId: PropTypes.number.isRequired,
    episodeId: PropTypes.number.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, comicId, episodeId, comics } = nextProps
    if (!this.getPages(comics, comicId, episodeId) &&
        (comicId !== this.props.comicId ||
        episodeId !== this.props.episodeId)) {
      dispatch(Actions.fetchComicEpisodePagesIfNeeded(comicId, episodeId))
    }
  }

  componentDidMount() {
    const { dispatch, comicId, episodeId } = this.props
    dispatch(Actions.fetchComicEpisodePagesIfNeeded(comicId, episodeId))
  }

  getPages = (comics, comicId, episodeId) => {
    const comic = comics.find(c => c.id === comicId) || {}
    const episode = comic.episodes.find(e => e.id === episodeId) || {}
    return episode.pages
  }

  onPrevEpisodeClick = () => {

  }

  onNextEpisodeClick = () => {

  }

  render() {
    const { comicId, episodeId, comics } = this.props
    return (
      <ComicViewer
        pages={ this.getPages(comics, comicId, episodeId) }
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
  const comics = state.comic.comics

  return {
    comicId,
    episodeId,
    comics
  }
}

export default connect(
  mapStateToProps
)(ComicViewerContainer)
