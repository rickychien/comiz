import { connect } from 'react-redux'

import SearchBar from './SearchBar'

import * as Actions from '../../actions'

function mapStateToProps(state) {
  return {
    value: state.filter.query,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(evt) {
      dispatch(Actions.filterQuery(evt.target.value))
      dispatch(Actions.updateComicList(0))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
