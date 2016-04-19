import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from './components/App'
import { Provider } from 'react-redux'
import configureStore from './store'

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
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
