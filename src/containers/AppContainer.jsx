import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import App from '../components/App'

import * as Actions from '../actions'

const mapStateToProps = (state) => {
  return {
    showComicList: !state.comicViewer.open
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBackClick: () => {
      dispatch(Actions.hideComicViewer())
    },
    onComicNavigationClick: () => {
      dispatch(Actions.showComicNavigation())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
