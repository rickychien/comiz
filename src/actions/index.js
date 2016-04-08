export const filterCategory = (category) => {
  return {
    type: 'FILTER_CATEGORY',
    category
  }
}

export const filterQuery = (query) => {
  return {
    type: 'FILTER_QUERY',
    query
  }
}

const requestComics = () => {
  return {
    type: 'REQUEST_COMICS',
  }
}

const receiveComics = (items) => {
  return {
    type: 'RECEIVE_COMICS',
    items,
    lastUpdated: Date.now()
  }
}

const fetchComics = () => {
  return dispatch => {
    dispatch(requestComics())
    return fetch(`/api/updates`)
      .then(res => res.json())
      .then(json => dispatch(receiveComics(json)))
  }
}

export function fetchComicsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.isFetching) {
      return dispatch(fetchComics())
    }
  }
}
