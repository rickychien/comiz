import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicViewer from './ComicViewer'

import * as Actions from '../../actions'

class ComicViewerContainer extends React.Component {

  static propTypes = {
    comicId: PropTypes.number.isRequired,
    episodeId: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object,
    episodes: PropTypes.object.isRequired,
    pages: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch, comicId, episodeId } = this.props
    dispatch(Actions.fetchPages(comicId, episodeId))
    dispatch(Actions.markRead(comicId, episodeId))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, comicId, episodeId } = nextProps
    if (comicId !== this.props.comicId || episodeId !== this.props.episodeId) {
      dispatch(Actions.fetchPages(comicId, episodeId))
      dispatch(Actions.markRead(comicId, episodeId))
    }
  }

  onPrevEpisodeClick = () => this.goNextEpisodeByOffset(-1)

  onNextEpisodeClick = () => this.goNextEpisodeByOffset(+1)

  goNextEpisodeByOffset = (offset) => {
    const { dispatch, comicId, episodeId, episodes } = this.props
    const episode = episodes[episodeId + offset]
    if (episode) {
      dispatch(Actions.showComicViewer(comicId, episode.id))
      dispatch(Actions.fetchPages(comicId, episode.id))
      dispatch(Actions.markRead(comicId, episodeId))
    }
  }

  render() {
    const { episodeId, episodes, isFetching, fetchError, pages } = this.props

    return (
      <ComicViewer
        pages={ pages }
        episode= { episodes[episodeId] }
        isFetching= { isFetching }
        fetchError={ fetchError }
        prevEpisode={ episodes[episodeId - 1] }
        nextEpisode={ episodes[episodeId + 1] }
        onPrevEpisodeClick={ this.onPrevEpisodeClick }
        onNextEpisodeClick={ this.onNextEpisodeClick }
      />
    )
  }

}

function mapStateToProps(state) {
  const { comicId, episodeId } = state.comicViewer
  const { isFetching, fetchError } = state.pages

  return {
    comicId,
    episodeId,
    isFetching,
    fetchError,
    episodes: state.episodes.entries,
    pages: state.pages.entries,
  }
}

export default connect(
  mapStateToProps
)(ComicViewerContainer)
