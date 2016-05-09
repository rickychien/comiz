import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ComicViewer from './ComicViewer'

import Actions from '../../actions'
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
  }

  componentWillUpdate(nextProps) {
    this.handleDataFetch(nextProps)
  }

  onBackClick = () => {
    this.props.dispatch(push('/'))
  }

  onComicDrawerClick = () => {
    this.props.dispatch(Actions.updateComicDrawer(true, this.props.comicId))
  }

  onPrevEpisodeClick = () => this.handleEpisodeNavigation(-1)

  onNextEpisodeClick = () => this.handleEpisodeNavigation(+1)

  getNextEpisodeIdByOffset = (offset) => {
    const { episodeId, episodes } = this.props
    const episodeIds = Array.from(episodes.entries, val => val[0])
    return episodeIds[episodeIds.indexOf(episodeId) + offset]
  }

  handleEpisodeNavigation = (offset) => {
    const { comicId, dispatch } = this.props
    const nextEpisodeId = this.getNextEpisodeIdByOffset(offset)
    if (nextEpisodeId) {
      dispatch(push(`/viewer?cid=${comicId}&eid=${nextEpisodeId}`))
    }
  }

  handleDataFetch = (nextProps) => {
    const { comicId, comic, episodeId, episodes, pages, dispatch } =
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

    const episode = episodes.entries.get(episodeId)
    document.title = (comic && episode) ?
      `${comic.title} - ${episode.title} - ${App.title}` : App.title
  }

  render() {
    const { episodeId, episodes: { entries: episodes }, pages } = this.props

    return (
      <ComicViewer
        pages={ pages.entries }
        episode={ episodes.get(episodeId) }
        isFetching={ pages.isFetching }
        fetchError={ pages.fetchError }
        prevEpisode={ episodes.get(this.getNextEpisodeIdByOffset(-1)) }
        nextEpisode={ episodes.get(this.getNextEpisodeIdByOffset(+1)) }
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
    comic: state.comics.entries.get(parseInt(cid, 10)),
    episodeId: parseInt(eid, 10),
    episodes: state.episodes,
    pages: state.pages,
    comicViewer: state.comicViewer,
  }
}

export default connect(
  mapStateToProps
)(ComicViewerContainer)
