import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'

import configureStore from './store'

import ComicDrawerContainer from './components/ComicDrawer'
import ComicListContainer from './components/ComicList'
import ComicViewerContainer from './components/ComicViewer'

import './index.css'
import './assets/materialicons.css'

function getStoreUserPrefs(key) {
  let result
  try {
    result = JSON.parse(localStorage[key])
  } catch (err) {
    result = []
  }
  return result
}

const initialState = {
  userPrefs: {
    favorites: getStoreUserPrefs('userPrefs.favorites'),
    reads: getStoreUserPrefs('userPrefs.reads'),
  },
}

const store = configureStore(initialState)

render(
  <Provider store={ store }>
    <HashRouter>
      <div>
        <Switch>
          <Route path="/comics/:category" component={ ComicListContainer } />
          <Route path="/viewer" component={ ComicViewerContainer } />
          <Redirect from="*" to="comics/latest" />
        </Switch>
        <ComicDrawerContainer />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
)
