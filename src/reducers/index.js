import { combineReducers } from 'redux'

import comic from './comic'
import comicNavigation from './comicNavigation'
import filter from './filter'

const rootReducer = combineReducers({
  comic,
  comicNavigation,
  filter
})

export default rootReducer
