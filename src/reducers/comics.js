const initialState = {
  isFetching: false,
  fetchError: null,
  entries: {}
}

function mergeEntries(object, array) {
  return array.reduce((prev, curr) => {
    return Object.assign(prev, { [curr.id]: curr })
  }, Object.assign({}, object))
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_COMICS_REQUEST':
    case 'FETCH_COMIC_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: null
      })
    case 'FETCH_COMICS_SUCCESS':
    case 'FETCH_COMIC_SUCCESS':
      const comics = action.comics || [action.comic]
      return Object.assign({}, state, {
        isFetching: false,
        entries: mergeEntries(state.entries, comics)
      })
    case 'FETCH_COMICS_FAILURE':
    case 'FETCH_COMIC_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.error
      })
    default:
      return state
  }
}
