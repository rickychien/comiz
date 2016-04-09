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

const fetchComicsRequest = () => {
  return {
    type: 'FETCH_COMICS_REQUEST'
  }
}

const fetchComicsSuccess = (comics) => {
  return {
    type: 'FETCH_COMICS_SUCCESS',
    comics
  }
}

const fetchComicsFailure = (error) => {
  return {
    type: 'FETCH_COMICS_FAILURE',
    error
  }
}

const fetchComics = () => {
  return dispatch => {
    dispatch(fetchComicsRequest())
    return fetch(`/api/updates`)
      .then(res => res.json())
      .then(json => dispatch(fetchComicsSuccess(json)))
      .catch(err => dispatch(fetchComicsFailure(err)))
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

const fetchComicItemRequest = () => {
  return {
    type: 'FETCH_COMIC_ITEM_REQUEST'
  }
}

const fetchComicItemSuccess = (comic) => {
  return {
    type: 'FETCH_COMIC_ITEM_SUCCESS',
    comic
  }
}

const fetchComicItemFailure = (error) => {
  return {
    type: 'FETCH_COMIC_ITEM_FAILURE',
    error
  }
}

const fetchComicItem = (comicId) => {
  return dispatch => {
    dispatch(fetchComicItemRequest())
    return fetch(`/api/comics/${comicId}`)
      .then(res => res.json())
      .then(json => dispatch(fetchComicItemSuccess(json)))
      .catch(err => dispatch(fetchComicItemFailure(err)))
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

// Fetch comic episodes from server

const fetchComicEpisodesRequest = () => {
  return {
    type: 'FETCH_COMIC_EPISODES_REQUEST'
  }
}

const fetchComicEpisodesSuccess = (episodes) => {
  return {
    type: 'FETCH_COMIC_EPISODES_SUCCESS',
    episodes
  }
}

const fetchComicEpisodesFailure = (error) => {
  return {
    type: 'FETCH_COMIC_EPISODES_FAILURE',
    error
  }
}

const fetchComicEpisodes = (comicId) => {
  return dispatch => {
    dispatch(fetchComicEpisodesRequest())
    return fetch(`/api/comics/${comicId}/episodes`)
      .then(res => res.json())
      .then(json => dispatch(fetchComicEpisodesSuccess(json)))
      .catch(err => dispatch(fetchComicEpisodesFailure(err)))
  }
}

export function fetchComicEpisodesIfNeeded(comicId) {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.isFetching) {
      return dispatch(fetchComicEpisodes(comicId))
    }
  }
}

// Toggle favorite

export const toggleFavorite = (comicId) => {
  return {
    type: 'TOGGLE_FAVORITE',
    comicId
  }
}
