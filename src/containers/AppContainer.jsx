import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import App from '../components/App'

import * as Actions from '../actions'

const mapStateToProps = (state) => {
  return {
    showComicList: !state.comicViewer.open
  }
}

export default connect(
  mapStateToProps
)(App)
