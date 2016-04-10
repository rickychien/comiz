import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicEpisode from '../components/ComicEpisode'

import * as Actions from '../actions'

const mapStateToProps = (state, ownProps) => {
  const { comicId, episodeId } = state.comicViewer
  const { comic, episode } = ownProps
  return {
    highlight: comicId === comic.id && episodeId === episode.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEpisodeClick: (comic, episode) => {
      dispatch(Actions.showComicViewer(comic.id, episode.id))
      dispatch(Actions.hideComicDrawer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicEpisode)
