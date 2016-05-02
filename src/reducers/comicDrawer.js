const initialState = {
  open: false,
  comicId: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMIC_DRAWER':
      return {
        open: action.payload.open,
        comicId: action.payload.comicId || state.comicId,
      }
    default:
      return state
  }
}
