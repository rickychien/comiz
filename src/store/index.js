import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware,
    promiseMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'] }),
  ]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-logger').createLogger({ collapsed: true }))
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  )
}
