import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRedirect, Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { hashHistory } from './services'
import configureStore from './store'

import App from './components/App'
import ComicList from './components/ComicList'
import ComicViewer from './components/ComicViewer'

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
    <Router history={ syncHistoryWithStore(hashHistory, store) }>
      <Route path="/" component={ App }>
        <IndexRedirect to="comics" />
        <Route path="comics" component={ ComicList } />
        <Route path="viewer" component={ ComicViewer } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
