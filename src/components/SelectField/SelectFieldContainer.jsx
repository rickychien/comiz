import { connect } from 'react-redux'

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

function mapDispatchToProps(dispatch) {
  return {
    onChange: (evt) => {
      dispatch(Actions.filterCategory(evt.target.value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectField)
