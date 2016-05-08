import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRedirect, Redirect, Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import * as Actions from './actions'
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

function updateCategory(nextState) {
  const { category } = nextState.params

  if (category) {
    store.dispatch(Actions.filterCategory(nextState.params.category))
  }
}

function updateComicViewer(nextState) {
  const { cid, eid } = nextState.location.query

  if (cid && eid) {
    store.dispatch(Actions.updateComicViewer(cid, eid))
  }
}

render(
  <Provider store={ store }>
    <Router history={ syncHistoryWithStore(hashHistory, store) }>
      <Route path="/" component={ App }>
        <IndexRedirect to="comics/latest" />
        <Route
          path="comics/:category"
          component={ ComicList }
          onEnter={ updateCategory }
        />
        <Route
          path="viewer"
          component={ ComicViewer }
          onEnter={ updateComicViewer }
        />
        <Redirect from="*" to="comics/latest" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
