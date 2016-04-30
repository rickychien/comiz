import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ComicEpisode from './ComicEpisode'

import * as Actions from '../../actions'

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
  const { comic, episode } = ownProps
  return {
    onEpisodeClick() {
      dispatch(push(`/viewer?cid=${comic.id}&eid=${episode.id}`))
    },
    onEpisodeRightClick() {
      dispatch(Actions.toggleRead(comic.id, episode.id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicEpisode)
