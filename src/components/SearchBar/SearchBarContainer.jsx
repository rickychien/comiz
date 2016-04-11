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
    onChange(query) {
      dispatch(Actions.filterQuery(query))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
