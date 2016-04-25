const initialState = {
  comicId: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMIC_DRAWER':
      return { comicId: action.comicId }
    default:
      return state
  }
}
