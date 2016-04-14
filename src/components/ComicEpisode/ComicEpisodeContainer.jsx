import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

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
    markRead: !!markRead
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onEpisodeClick(comicId, episodeId) {
      dispatch(Actions.showComicViewer(comicId, episodeId))
      dispatch(Actions.hideComicDrawer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicEpisode)
