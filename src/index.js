import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './index.css'

injectTapEventPlugin();

render(
  <App/>,
  document.getElementById('root')
)
