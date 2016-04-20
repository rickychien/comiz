import { connect } from 'react-redux'

import ComicItem from './ComicItem'

import * as Actions from '../../actions'

function mapStateToProps(state, ownProps) {
  return {
    comic: ownProps.comic,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(comicId) {
      dispatch(Actions.showComicDrawer(comicId))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicItem)
