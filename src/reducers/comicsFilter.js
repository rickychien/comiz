import * as ActionTypes from '../actions'

const regexpFilter = (state, action) => {
  switch (action.name) {
    case '':
      return /.+/
    default:
      return new RegExp(action.name)
  }
}

const comicsFilter = (state = {
  comicsFilter: {
    category: 'SHOW_LATEST',
    regexp: /.+/
  }
}, action) => {
  switch (action.type) {
    case 'SET_COMICLIST_CATEGORY':
      return Object.assign({}, state, {
        comicsFilter: {
          category: action.category
        }
      })
    case 'SET_COMICLIST_NAME':
      return Object.assign({}, state, {
        comicsFilter: {
          regexp: regexpFilter(state, action)
        }
      })
    default:
      return state
  }
}

export default comicsFilter
