import React from 'react'

import AppBar from '../AppBar'
import ComicViewer from '../ComicViewer'
import FlatButton from '../FlatButton'
import ComicNavigation from '../ComicNavigation'
import CategorySelectField from '../../containers/CategorySelectField'
import ComicContainer from '../../containers/ComicContainer'
import QuerySearchBar from '../../containers/QuerySearchBar'

import styles from './App.css'

export default class App extends React.Component {

  render() {
    return (
      <div>
        {
          true ? (
            <div>
              <AppBar title="Comiz" materialIcon="fingerprint">
                <CategorySelectField />
                <QuerySearchBar />
              </AppBar>
              <ComicContainer />
            </div>
          ) : (
            <div>
              <AppBar materialIcon="arrow_back">
                <FlatButton materialIcon="book" />
              </AppBar>
              <ComicViewer />
            </div>
          )
        }
        <ComicNavigation />
      </div>
    )
  }
}
