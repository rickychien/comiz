// Filter comics by category

export const filterCategory = (category) => {
  return {
    type: 'FILTER_CATEGORY',
    category
  }
}

// Filter comics by query string

export const filterQuery = (query) => {
  return {
    type: 'FILTER_QUERY',
    query
  }
}

// Show comic navigation

export const showComicNavigation = (comicId) => {
  return {
    type: 'SHOW_COMIC_NAVIGATION',
    comicId
  }
}

// Hide comic navigation

export const hideComicNavigation = () => {
  return {
    type: 'HIDE_COMIC_NAVIGATION'
  }
}

// Fetch comics from server

const requestComics = () => {
  return {
    type: 'REQUEST_COMICS',
  }
}

const receiveComics = (items) => {
  return {
    type: 'RECEIVE_COMICS',
    items
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

// Fetch single comic item from server

const requestComicItem = () => {
  return {
    type: 'REQUEST_COMIC_ITEM',
  }
}

const receiveComicItem = (item) => {
  return {
    type: 'RECEIVE_COMIC_ITEM',
    item
  }
}

const fetchComicItem = (comicId) => {
  return dispatch => {
    dispatch(requestComicItem())
    return fetch(`/api/comics/${comicId}`)
      .then(res => res.json())
      .then(json => dispatch(receiveComicItem(json)))
  }
}

export function fetchComicItemIfNeeded(comicId) {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.isFetching) {
      return dispatch(fetchComicItem(comicId))
    }
  }
}
