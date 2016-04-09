const comicNavigation = (state = {
  open: false,
  comicId: null,
  isFetching: false,
  fetchError: null
}, action) => {
  switch (action.type) {
    case 'SHOW_COMIC_NAVIGATION':
      return Object.assign({}, state, {
        open: true,
        comicId: action.comicId
      })
    case 'HIDE_COMIC_NAVIGATION':
      return Object.assign({}, state, {
        open: false
      })
    case 'REQUEST_COMIC_ITEM':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_COMIC_ITEM':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.fetchError
      })
    default:
      return state
  }
}

export default comicNavigation
