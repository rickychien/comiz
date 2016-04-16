import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicItem from './ComicItem'

import * as Actions from '../../actions'

function ComicItemContainer({ comic, onClick }) {
  return (
    <ComicItem comic={ comic } onClick={ onClick } />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(comicId) {
      dispatch(Actions.showComicDrawer(comicId))
    },
  }
}

ComicItemContainer.propTypes = {
  comic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(ComicItemContainer)
