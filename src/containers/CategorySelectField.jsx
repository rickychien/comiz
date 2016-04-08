import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SelectField from '../components/SelectField'

import * as Actions from '../actions'

class CategorySelectField extends React.Component {

  static propTypes = {
    category: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <SelectField
        selectedValue={ this.props.category }
        menuItems={[
          { text: 'Latest', value: 'SHOW_LATEST' },
          { text: 'Favorite', value: 'SHOW_FAVORITE' }
        ]}
        onChange={ this.props.onChange }>
      </SelectField>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.filter.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (category) => {
      dispatch(Actions.filterCategory(category))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelectField)
