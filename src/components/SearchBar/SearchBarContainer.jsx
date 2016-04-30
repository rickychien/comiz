import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SearchBar from './SearchBar'

import * as Actions from '../../actions'

function mapStateToProps(state) {
  return {
    value: state.filter.query,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChange(evt) {
      dispatch(Actions.filterQuery(evt.target.value))
      dispatch(Actions.updateComicList(0))
      dispatch(push({ query: { ...ownProps.hashQuery, offset: 0 } }))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
