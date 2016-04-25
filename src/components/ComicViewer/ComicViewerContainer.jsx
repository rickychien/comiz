import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import ComicViewer from './ComicViewer'

import * as Actions from '../../actions'

class ComicViewerContainer extends React.Component {

  static propTypes = {
    comicId: PropTypes.number.isRequired,
    episodeId: PropTypes.number.isRequired,
    episodes: PropTypes.object.isRequired,
    pages: PropTypes.object.isRequired,
    comicViewer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.handleDataFetch()
  }

  componentWillUpdate(nextProps) {
    this.handleDataFetch(nextProps)
  }

  onPrevEpisodeClick = () => this.goNextEpisodeByOffset(-1)

  onNextEpisodeClick = () => this.goNextEpisodeByOffset(+1)

  onBackClick = () => {
    browserHistory.push('/comics')
  }

  onComicDrawerClick = () => {
    const { comicId, episodeId } = this.props
    browserHistory.push(`/viewer?id=${comicId}&cid=${comicId}&eid=${episodeId}`)
  }

  handleDataFetch = (nextProps) => {
    const { dispatch, comicId, episodeId, episodes, pages, comicViewer } =
          nextProps || this.props
    if (!comicId || !episodeId) return

    if (comicId !== episodes.comicId) {
      dispatch(Actions.fetchEpisodes(comicId))
    }

    if (comicId !== pages.comicId || episodeId !== pages.episodeId) {
      dispatch(Actions.fetchPages(comicId, episodeId))
    }

    if (comicId !== comicViewer.comicId || episodeId !== comicViewer.episodeId) {
      dispatch(Actions.updateComicViewer(comicId, episodeId))
    }
  }

  goNextEpisodeByOffset = (offset) => {
    const { comicId, episodeId, episodes } = this.props
    if (episodes.entries[episodeId + offset]) {
      browserHistory.push(`/viewer?cid=${comicId}&eid=${episodeId + offset}`)
    }
  }

  render() {
    const { episodeId, episodes, pages } = this.props

    return (
      <ComicViewer
        pages={ pages.entries }
        episode={ episodes.entries[episodeId] }
        isFetching={ pages.isFetching }
        fetchError={ pages.fetchError }
        prevEpisode={ episodes.entries[episodeId - 1] }
        nextEpisode={ episodes.entries[episodeId + 1] }
        onPrevEpisodeClick={ this.onPrevEpisodeClick }
        onNextEpisodeClick={ this.onNextEpisodeClick }
        onBackClick={ this.onBackClick }
        onComicDrawerClick={ this.onComicDrawerClick }
      />
    )
  }

}

function mapStateToProps(state, ownProps) {
  const { cid, eid } = ownProps.location.query

  return {
    comicId: parseInt(cid, 10),
    episodeId: parseInt(eid, 10),
    episodes: state.episodes,
    pages: state.pages,
    comicViewer: state.comicViewer,
  }
}

export default connect(
  mapStateToProps
)(ComicViewerContainer)
