const initialState = {
  open: false,
  comicId: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMIC_DRAWER':
      return {
        open: action.open,
        comicId: action.comicId || state.comicId,
      }
    default:
      return state
  }
}
