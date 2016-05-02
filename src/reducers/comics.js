const initialState = {
  isFetching: false,
  fetchError: false,
  entries: {},
}

function mergeEntries(object, array) {
  return array.reduce((prev, curr) => (
    Object.assign(prev, { [curr.id]: curr })
  ), Object.assign({}, object))
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_COMICS_REQUEST':
    case 'FETCH_COMIC_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: false,
      })
    case 'FETCH_COMICS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: mergeEntries(state.entries, action.payload),
      })
    case 'FETCH_COMIC_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: mergeEntries(state.entries, [action.payload]),
      })
    case 'FETCH_COMICS_FAILURE':
    case 'FETCH_COMIC_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: true,
      })
    default:
      return state
  }
}
