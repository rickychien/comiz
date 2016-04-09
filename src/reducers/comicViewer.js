const comicViewer = (state = {
  open: false,
  comicId: null,
  episodeId: null
}, action) => {
  switch (action.type) {
    case 'SHOW_COMIC_VIEWER':
      return Object.assign({}, state, {
        open: true,
        comicId: action.comicId,
        episodeId: action.episodeId
      })
    case 'HIDE_COMIC_VIEWER':
      return Object.assign({}, state, {
        open: false
      })
    default:
      return state
  }
}

export default comicViewer
