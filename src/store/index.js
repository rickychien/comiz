import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { hashHistory } from '../services'

export default function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(hashHistory),
  ]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-logger')({ collapsed: true }))
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
}
