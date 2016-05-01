import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SelectField from './SelectField'

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
      dispatch(push(`/comics/${evt.target.value}`))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectField)
