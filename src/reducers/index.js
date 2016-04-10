import { combineReducers } from 'redux'

import comic from './comic'
import comicDrawer from './comicDrawer'
import comicViewer from './comicViewer'
import filter from './filter'

const rootReducer = combineReducers({
  comic,
  comicDrawer,
  comicViewer,
  filter
})

export default rootReducer
