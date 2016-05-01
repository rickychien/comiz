import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ComicViewer from './ComicViewer'

import * as Actions from '../../actions'
import { App } from '../../constants'

class ComicViewerContainer extends React.Component {

  static propTypes = {
    comicId: PropTypes.number.isRequired,
    comic: PropTypes.object,
    episodeId: PropTypes.number.isRequired,
    episodes: PropTypes.object.isRequired,
    pages: PropTypes.object.isRequired,
    comicViewer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.handleDataFetch()
    this.props.dispatch(Actions.updateComicDrawer(false))
  }

  componentWillUpdate(nextProps) {
    this.handleDataFetch(nextProps)
  }

  onPrevEpisodeClick = () => this.goNextEpisodeByOffset(-1)

  onNextEpisodeClick = () => this.goNextEpisodeByOffset(+1)

  onBackClick = () => {
    this.props.dispatch(push('/'))
  }

  onComicDrawerClick = () => {
    this.props.dispatch(Actions.updateComicDrawer(true, this.props.comicId))
  }

  handleDataFetch = (nextProps) => {
    const { comicId, comic, episodeId, episodes, pages, comicViewer, dispatch } =
          nextProps || this.props

    if (!comicId || !episodeId) return

    if (!nextProps && !comic) {
      this.props.dispatch(Actions.fetchComic(comicId))
    }

    if (comicId !== episodes.comicId) {
      dispatch(Actions.fetchEpisodes(comicId))
    }

    if (comicId !== pages.comicId || episodeId !== pages.episodeId) {
      dispatch(Actions.fetchPages(comicId, episodeId))
    }

    if (comicId !== comicViewer.comicId || episodeId !== comicViewer.episodeId) {
      dispatch(Actions.updateComicViewer(comicId, episodeId))
    }

    const episode = episodes.entries[episodeId]
    document.title = (comic && episode) ?
      `${comic.title} - ${episode.title} - ${App.title}` : App.title
  }

  goNextEpisodeByOffset = (offset) => {
    const { comicId: cid, episodeId: eid, episodes, dispatch } = this.props
    if (episodes.entries[eid + offset]) {
      dispatch(push({ pathname: 'viewer', query: { cid, eid: eid + offset } }))
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
    comic: state.comics.entries[cid],
    episodeId: parseInt(eid, 10),
    episodes: state.episodes,
    pages: state.pages,
    comicViewer: state.comicViewer,
  }
}

export default connect(
  mapStateToProps
)(ComicViewerContainer)
