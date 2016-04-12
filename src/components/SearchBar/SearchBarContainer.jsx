import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SearchBar from './SearchBar'

import * as Actions from '../../actions'

function mapStateToProps(state) {
  return {
    value: state.filter.query
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(evt) {
      dispatch(Actions.filterQuery(evt.target.value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
