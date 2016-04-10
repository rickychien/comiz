import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicViewer from '../components/ComicViewer'

import * as Actions from '../actions'

class ComicViewerContainer extends React.Component {

  static propTypes = {
    comicId: PropTypes.number.isRequired,
    episodeId: PropTypes.number.isRequired,
    comics: PropTypes.array.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, comicId, episodeId, comics } = nextProps
    if (!this.getPagesByEpisodeId(comics, comicId, episodeId) &&
        (comicId !== this.props.comicId ||
        episodeId !== this.props.episodeId)) {
      dispatch(Actions.fetchComicEpisodePagesIfNeeded(comicId, episodeId))
    }
  }

  componentDidMount() {
    const { dispatch, comicId, episodeId } = this.props
    dispatch(Actions.fetchComicEpisodePagesIfNeeded(comicId, episodeId))
  }

  getEpisodesByComicId = (comics, comicId) => {
    const comic = comics.find(c => c.id === comicId)
    return comic && comic.episodes
  }

  getPagesByEpisodeId = (comics, comicId, episodeId) => {
    const episodes = this.getEpisodesByComicId(comics, comicId) || []
    const episode = episodes.find(e => e.id === episodeId)
    return episode && episode.pages
  }

  getEpisodeByIndexOffset = (offset) => {
    const { comics, comicId, episodeId } = this.props
    const episodes = this.getEpisodesByComicId(comics, comicId) || []
    const episodeIndex = episodes.findIndex(e => e.id === episodeId)
    return episodes[episodeIndex + offset]
  }

  onPrevEpisodeClick = () => {
    const { dispatch, comics, comicId } = this.props
    const episode = this.getEpisodeByIndexOffset(-1)
    if (episode) {
      dispatch(Actions.showComicViewer(comicId, episode.id))
      dispatch(Actions.fetchComicEpisodePagesIfNeeded(comicId, episode.id))
    }
  }

  onNextEpisodeClick = () => {
    const { dispatch, comics, comicId } = this.props
    const episode = this.getEpisodeByIndexOffset(+1)
    if (episode) {
      dispatch(Actions.showComicViewer(comicId, episode.id))
      dispatch(Actions.fetchComicEpisodePagesIfNeeded(comicId, episode.id))
    }
  }

  render() {
    const { comicId, episodeId, comics } = this.props
    return (
      <ComicViewer
        pages={ this.getPagesByEpisodeId(comics, comicId, episodeId) }
        prevEpisodeDisabled={ !this.getEpisodeByIndexOffset(-1) }
        onPrevEpisodeClick={ this.onPrevEpisodeClick }
        nextEpisodeDisabled={ !this.getEpisodeByIndexOffset(+1) }
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
