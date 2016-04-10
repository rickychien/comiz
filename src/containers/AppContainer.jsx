import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import App from '../components/App'

import * as Actions from '../actions'

const mapStateToProps = (state) => {
  return {
    showComicList: !state.comicViewer.open,
    shrink: state.comicDrawer.open
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBackClick: () => {
      dispatch(Actions.hideComicViewer())
    },
    onComicDrawerClick: () => {
      dispatch(Actions.showComicDrawer())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
