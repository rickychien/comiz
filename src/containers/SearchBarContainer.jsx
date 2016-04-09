import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SearchBar from '../components/SearchBar'

import * as Actions from '../actions'

class SearchBarContainer extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <SearchBar
        value={ this.props.value }
        onChange={ this.props.onChange }
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    value: state.filter.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (query) => {
      dispatch(Actions.filterQuery(query))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarContainer)
