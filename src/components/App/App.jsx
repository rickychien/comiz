import React, { PropTypes } from 'react'

import AppBar from '../AppBar'
import FlatButton from '../FlatButton'
import CategorySelectField from '../../containers/CategorySelectField'
import ComicListContainer from '../../containers/ComicListContainer'
import ComicNavigationContainer from '../../containers/ComicNavigationContainer'
import ComicViewerContainer from '../../containers/ComicViewerContainer'
import SearchBarContainer from '../../containers/SearchBarContainer'

import styles from './App.css'

export default class App extends React.Component {

  static defaultProps = {
    showComicList: true
  }

  static propTypes = {
    showComicList: PropTypes.bool,
    onBackClick: PropTypes.func,
    onComicNavigationClick: PropTypes.func
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
              <ComicListContainer />
            </div>
          ) : (
            <div>
              <AppBar
                materialIcon="arrow_back"
                onLogoClick={ this.props.onBackClick }
              >
                <FlatButton
                  materialIcon="book"
                  onClick={ this.props.onComicNavigationClick }
                />
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
