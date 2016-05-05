const initialState = {
  isFetching: false,
  fetchError: false,
  entries: new Map(),
  comicId: 0,
}

function mergeEntries(entries, array) {
  return array.reduce((prev, curr) => (
    Object.assign(prev, prev.set(curr.id, curr))
  ), entries)
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EPISODES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: false,
        comicId: action.payload.comicId,
      })
    case 'FETCH_EPISODES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: mergeEntries(new Map(), action.payload),
      })
    case 'FETCH_EPISODES_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: true,
      })
    default:
      return state
  }
}
