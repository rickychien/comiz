import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SelectField from '../components/SelectField'

import * as ActionTypes from '../actions'

class CategorySelectField extends React.Component {

  static PropTypes = {
    category: PropTypes.string.isRequired,
    onCategoryChanged: PropTypes.func.isRequired
  }

  onCategoryChanged = (event) => {
    this.props.onCategoryChanged(event.target.value)
  }

  render() {
    return (
      <SelectField
        selectedValue={ this.props.category }
        menuItems={[
          { text: 'Latest', value: 'SHOW_LATEST' },
          { text: 'Favorite', value: 'SHOW_FAVORITE' }
        ]}
        onChange={ this.onCategoryChanged }>
      </SelectField>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.comicsFilter.category
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCategoryChanged: (category) => {
      dispatch(ActionTypes.setComicListCategory(category))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelectField)
