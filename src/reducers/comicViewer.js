const initialState = {
  open: false,
  comicId: 0,
  episodeId: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_COMIC_VIEWER':
      return Object.assign({}, state, {
        open: true,
        comicId: action.comicId || state.comicId || initialState.comicId,
        episodeId: action.episodeId || state.episodeId || initialState.episodeId,
      })
    case 'HIDE_COMIC_VIEWER':
      return { ...state, open: false }
    default:
      return state
  }
}
