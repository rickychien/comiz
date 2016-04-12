import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from './components/App'
import { Provider } from 'react-redux'
import configureStore from './store'

import './index.css'

const store = configureStore()

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
