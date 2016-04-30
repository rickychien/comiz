import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SelectField from './SelectField'

import * as Actions from '../../actions'

function mapStateToProps(state) {
  const { category, categories } = state.filter
  const menuItems = Object.keys(categories).map((item) => (
    { text: categories[item], value: item }
  ))

  return {
    selectedValue: category,
    menuItems,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChange: (evt) => {
      dispatch(Actions.filterCategory(evt.target.value))
      dispatch(Actions.updateComicList(0))
      dispatch(push({ query: { ...ownProps.hashQuery, offset: 0 } }))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectField)
