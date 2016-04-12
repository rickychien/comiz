import { combineReducers } from 'redux'

import comics from './comics'
import episodes from './episodes'
import pages from './pages'
import comicDrawer from './comicDrawer'
import comicViewer from './comicViewer'
import filter from './filter'
import userPrefs from './userPrefs'

export default combineReducers({
  comics,
  episodes,
  pages,
  comicDrawer,
  comicViewer,
  filter,
  userPrefs
})
