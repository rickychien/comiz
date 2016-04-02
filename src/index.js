import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './index.css'

injectTapEventPlugin();

render(
  <Provider>
    <App/>
  </Provider>,
  document.getElementById('root')
)
