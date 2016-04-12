import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicEpisode from './ComicEpisode'

import * as Actions from '../../actions'

function mapStateToProps(state, ownProps) {
  const { comicId, episodeId } = state.comicViewer
  const { comic, episode } = ownProps
  return {
    highlight: comicId === comic.id && episodeId === episode.id
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
