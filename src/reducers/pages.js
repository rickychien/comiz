const initialState = {
  isFetching: false,
  fetchError: null,
  entries: [],
  comicId: 0,
  episodeId: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PAGES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: null,
        comicId: 0,
        episodeId: 0
      })
    case 'FETCH_PAGES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: action.pages,
        comicId: action.comicId,
        episodeId: action.episodeId
      })
    case 'FETCH_PAGES_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.error,
        comicId: 0,
        episodeId: 0
      })
    default:
      return state
  }
}
