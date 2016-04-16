import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { AppBar } from '../AppBar'
import { FlatButton } from '../FlatButton'
import { ComicDrawerContainer } from '../ComicDrawer'
import { ComicListContainer } from '../ComicList'
import { ComicViewerContainer } from '../ComicViewer'
import { SearchBarContainer } from '../SearchBar'
import { SelectFieldContainer } from '../SelectField'

import * as Actions from '../../actions'

function AppContainer({
  showComicViewer,
  shrink,
  onBackClick,
  onComicDrawerClick,
}) {
  return (
    <div>
      {
        !showComicViewer ? (
          <div>
            <AppBar title="Comiz" materialIcon="fingerprint" shrink={ shrink }>
              <SelectFieldContainer />
              <SearchBarContainer />
            </AppBar>
            <ComicListContainer shrink={ shrink } />
          </div>
        ) : (
          <div>
            <AppBar
              materialIcon="arrow_back"
              onLogoClick={ onBackClick }
              transparent
            >
              <FlatButton materialIcon="book" onClick={ onComicDrawerClick } />
            </AppBar>
            <ComicViewerContainer />
          </div>
        )
      }
      <ComicDrawerContainer />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    showComicViewer: state.comicViewer.open,
    shrink: state.comicDrawer.open,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onBackClick() {
      dispatch(Actions.hideComicViewer())
    },
    onComicDrawerClick() {
      dispatch(Actions.showComicDrawer())
    },
  }
}

AppContainer.propTypes = {
  showComicViewer: PropTypes.bool,
  shrink: PropTypes.bool,
  onBackClick: PropTypes.func,
  onComicDrawerClick: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
