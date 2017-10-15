import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SelectField from './SelectField'

function mapStateToProps(state) {
  const { categories } = state.filter
  const menuItems = Object.keys(categories).map((item) => (
    { text: categories[item], value: item }
  ))

  return {
    menuItems,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChange: (evt) => {
      ownProps.history.push(`/comics/${evt.target.value}`)
    },
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectField))
