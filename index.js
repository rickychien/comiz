import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import './style/index.css'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
