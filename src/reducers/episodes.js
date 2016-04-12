const initialState = {
  isFetching: false,
  fetchError: null,
  entries: {},
  comicId: 0
}

function mergeEntries(object, array) {
  return array.reduce((prev, curr) => {
    return Object.assign(prev, { [curr.id]: curr })
  }, Object.assign({}, object))
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EPISODES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: null,
        comicId: 0
      })
    case 'FETCH_EPISODES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: mergeEntries(state.entries, action.episodes),
        comicId: action.comicId
      })
    case 'FETCH_EPISODES_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.error,
        comicId: 0
      })
    default:
      return state
  }
}
