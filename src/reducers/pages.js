const initialState = {
  isFetching: false,
  fetchError: false,
  entries: [],
  comicId: 0,
  episodeId: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PAGES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: false,
        comicId: action.payload.comicId,
        episodeId: action.payload.episodeId,
      })
    case 'FETCH_PAGES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: action.payload,
      })
    case 'FETCH_PAGES_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: true,
      })
    default:
      return state
  }
}
