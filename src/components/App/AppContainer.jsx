import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicDrawer from '../ComicDrawer'

import * as Actions from '../../actions'

class AppContainer extends React.Component {

  componentWillUpdate(nextProps) {
    if (!nextProps.location.query.id) {
      nextProps.dispatch(Actions.updateComicDrawer(0))
    }
  }

  render() {
    const { open, comicId, location, children } = this.props

    return (
      <div>
        { children }
        <ComicDrawer open={ open } comicId={ comicId } location={ location } />
      </div>
    )
  }

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
