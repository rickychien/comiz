const comicDrawer = (state = {
  open: false,
  comicId: null
}, action) => {
  switch (action.type) {
    case 'SHOW_COMIC_DRAWER':
      return Object.assign({}, state, {
        open: true,
        comicId: action.comicId || state.comicId
      })
    case 'HIDE_COMIC_DRAWER':
      return Object.assign({}, state, {
        open: false
      })
    default:
      return state
  }
}

export default comicDrawer
