import * as fetch from './fetch'
import * as filter from './filter'
import * as update from './update'
import * as userPrefs from './userPrefs'

export default { ...fetch, ...filter, ...update, ...userPrefs }
