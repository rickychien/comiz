import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware,
    DEBUG && require('redux-logger')(),
  ].filter(Boolean)

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
}
