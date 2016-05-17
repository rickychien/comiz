const initialState = {
  comicId: 0,
  episodeId: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMIC_VIEWER':
      return {
        comicId: action.payload.comicId,
        episodeId: action.payload.episodeId,
      }
    default:
      return state
  }
}
