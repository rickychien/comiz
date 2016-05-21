import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ComicEpisode from './ComicEpisode'

import Actions from '../../actions'

function mapStateToProps(state, ownProps) {
  const { comicId, episodeId } = state.comicViewer
  const { comic, episode } = ownProps
  const markRead = state.userPrefs.reads.find(read => (
    read.comicId === comic.id && read.episodeId === episode.id
  ))

  return {
    highlight: comicId === comic.id && episodeId === episode.id,
    markRead: !!markRead,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { comic: { id: cid }, episode: { id: eid } } = ownProps

  return {
    onEpisodeClick() {
      dispatch(push(`/viewer?cid=${cid}&eid=${eid}`))
      dispatch(Actions.updateComicDrawer(false))
    },
    onEpisodeRightClick() {
      dispatch(Actions.toggleRead(cid, eid))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicEpisode)
