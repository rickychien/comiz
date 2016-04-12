import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SelectField from './SelectField'

import * as Actions from '../../actions'

function mapStateToProps(state) {
  const { category, categories } = state.filter
  const menuItems = Object.keys(categories).map((category) => {
    return { text: categories[category], value: category }
  })

  return {
    category,
    menuItems
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (evt) => {
      dispatch(Actions.filterCategory(evt.target.value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectField)
