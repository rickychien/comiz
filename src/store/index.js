import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { hashHistory } from '../services'

export default function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware,
    promiseMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'] }),
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
