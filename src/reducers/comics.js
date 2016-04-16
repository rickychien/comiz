const initialState = {
  isFetching: false,
  fetchError: null,
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
        fetchError: null,
      })
    case 'FETCH_COMICS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: mergeEntries({}, action.comics),
      })
    case 'FETCH_COMIC_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        entries: mergeEntries(state.entries, [action.comic]),
      })
    case 'FETCH_COMICS_FAILURE':
    case 'FETCH_COMIC_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.error,
      })
    default:
      return state
  }
}
