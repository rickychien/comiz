const initialState = {
  comicId: 0,
  episodeId: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMIC_VIEWER':
      return { comicId: action.comicId, episodeId: action.episodeId }
    default:
      return state
  }
}
