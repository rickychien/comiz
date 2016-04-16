const initialState = {
  open: false,
  comicId: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_COMIC_DRAWER':
      const comicId = action.comicId || state.comicId || initialState.comicId
      return { ...state, open: true, comicId }
    case 'HIDE_COMIC_DRAWER':
      return { ...state, open: false }
    default:
      return state
  }
}
