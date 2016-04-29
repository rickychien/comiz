import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicDrawer from '../ComicDrawer'

function AppContainer({ open, comicId, location, children }) {
  return (
    <div>
      { children }
      <ComicDrawer open={ open } comicId={ comicId } location={ location } />
    </div>
  )
}

AppContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  comicId: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.location.query.id
  return {
    open: !!id,
    comicId: parseInt(id, 10) || state.comicDrawer.comicId,
  }
}

export default connect(
  mapStateToProps
)(AppContainer)
