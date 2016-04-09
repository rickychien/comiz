import { combineReducers } from 'redux'

import comic from './comic'
import comicNavigation from './comicNavigation'
import comicViewer from './comicViewer'
import filter from './filter'

const rootReducer = combineReducers({
  comic,
  comicNavigation,
  comicViewer,
  filter
})

export default rootReducer
