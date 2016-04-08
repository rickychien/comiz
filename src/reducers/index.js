import { combineReducers } from 'redux'

import filter from './filter'
import comic from './comic'

const rootReducer = combineReducers({
  filter,
  comic
})

export default rootReducer
