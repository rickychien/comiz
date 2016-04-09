import React, { PropTypes } from 'react'

import AppBar from '../AppBar'
import FlatButton from '../FlatButton'
import CategorySelectField from '../../containers/CategorySelectField'
import ComicContainer from '../../containers/ComicContainer'
import ComicViewerContainer from '../../containers/ComicViewerContainer'
import ComicNavigationContainer from '../../containers/ComicNavigationContainer'
import SearchBarContainer from '../../containers/SearchBarContainer'

import styles from './App.css'

export default class App extends React.Component {

  static defaultProps = {
    showComicList: true
  }

  static propTypes = {
    showComicList: PropTypes.bool
  }

  render() {
    return (
      <div>
        {
          this.props.showComicList ? (
            <div>
              <AppBar title="Comiz" materialIcon="fingerprint">
                <CategorySelectField />
                <SearchBarContainer />
              </AppBar>
              <ComicContainer />
            </div>
          ) : (
            <div>
              <AppBar materialIcon="arrow_back">
                <FlatButton materialIcon="book" />
              </AppBar>
              <ComicViewerContainer />
            </div>
          )
        }
        <ComicNavigationContainer />
      </div>
    )
  }
}
