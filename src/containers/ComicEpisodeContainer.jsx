import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicEpisode from '../components/ComicEpisode'

import * as Actions from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    onEpisodeClick: (comic, episode) => {
      dispatch(Actions.showComicViewer(comic.id, episode.id))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ComicEpisode)
