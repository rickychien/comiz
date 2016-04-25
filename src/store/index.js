import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware,
  ]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-logger')())
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
}
