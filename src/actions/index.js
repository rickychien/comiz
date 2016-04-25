const SERVER_URL = process.env.SERVER_URL

// Filter comics by category

export function filterCategory(category) {
  return {
    type: 'FILTER_CATEGORY',
    category,
  }
}

// Filter comics by query string

export function filterQuery(query) {
  return {
    type: 'FILTER_QUERY',
    query,
  }
}

// Show comic drawer

export function showComicDrawer(comicId) {
  return {
    type: 'SHOW_COMIC_DRAWER',
    comicId,
  }
}

// Hide comic drawer

export function hideComicDrawer() {
  return {
    type: 'HIDE_COMIC_DRAWER',
  }
}

// Fetch comics from server

function fetchComicsRequest() {
  return {
    type: 'FETCH_COMICS_REQUEST',
  }
}

function fetchComicsSuccess(comics) {
  return {
    type: 'FETCH_COMICS_SUCCESS',
    comics,
  }
}

function fetchComicsFailure(error) {
  return {
    type: 'FETCH_COMICS_FAILURE',
    error,
  }
}

export function fetchComics() {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      dispatch(fetchComicsRequest())
      return fetch(`${SERVER_URL}/api/v1/updates`)
        .then(res => res.json())
        .then(json => dispatch(fetchComicsSuccess(json)))
        .catch(err => dispatch(fetchComicsFailure(err)))
    }
    return false
  }
}

// Update comic list for pagination

export function updateComicList(offset, comicsPerPage) {
  return {
    type: 'UPDATE_COMIC_LIST',
    offset,
    comicsPerPage,
  }
}

// Fetch single comic item from server

function fetchComicRequest() {
  return {
    type: 'FETCH_COMIC_REQUEST',
  }
}

function fetchComicSuccess(comic) {
  return {
    type: 'FETCH_COMIC_SUCCESS',
    comic,
  }
}

function fetchComicFailure(error) {
  return {
    type: 'FETCH_COMIC_FAILURE',
    error,
  }
}

export function fetchComic(comicId) {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      dispatch(fetchComicRequest())
      return fetch(`${SERVER_URL}/api/v1/comics/${comicId}`)
        .then(res => res.json())
        .then(json => dispatch(fetchComicSuccess(json)))
        .catch(err => dispatch(fetchComicFailure(err)))
    }
    return false
  }
}

// Fetch comic episodes from server

function fetchEpisodesRequest(comicId) {
  return {
    type: 'FETCH_EPISODES_REQUEST',
    comicId,
  }
}

function fetchEpisodesSuccess(comicId, episodes) {
  return {
    type: 'FETCH_EPISODES_SUCCESS',
    comicId,
    episodes,
  }
}

function fetchEpisodesFailure(comicId, error) {
  return {
    type: 'FETCH_EPISODES_FAILURE',
    comicId,
    error,
  }
}

export function fetchEpisodes(comicId) {
  return (dispatch, getState) => {
    if (!getState().episodes.isFetching) {
      dispatch(fetchEpisodesRequest(comicId))
      return fetch(`${SERVER_URL}/api/v1/comics/${comicId}/episodes`)
        .then(res => res.json())
        .then(json => dispatch(fetchEpisodesSuccess(comicId, json)))
        .catch(err => dispatch(fetchEpisodesFailure(comicId, err)))
    }
    return false
  }
}

// Toggle favorite

export function toggleFavorite(comicId) {
  return {
    type: 'TOGGLE_FAVORITE',
    comicId,
  }
}

// Mark read

export function markRead(comicId, episodeId) {
  return {
    type: 'MARK_READ',
    comicId,
    episodeId,
  }
}

// Unmark read

export function unmarkRead(comicId, episodeId) {
  return {
    type: 'UNMARK_READ',
    comicId,
    episodeId,
  }
}

// Show comic viewer

export function showComicViewer(comicId, episodeId) {
  return {
    type: 'SHOW_COMIC_VIEWER',
    comicId,
    episodeId,
  }
}

// Hide comic viewer

export function hideComicViewer() {
  return {
    type: 'HIDE_COMIC_VIEWER',
  }
}

// Fetch comic episode pages from server

function fetchPagesRequest(comicId, episodeId) {
  return {
    type: 'FETCH_PAGES_REQUEST',
    comicId,
    episodeId,
  }
}

function fetchPagesSuccess(comicId, episodeId, pages) {
  return {
    type: 'FETCH_PAGES_SUCCESS',
    comicId,
    episodeId,
    pages,
  }
}

function fetchPagesFailure(comicId, episodeId, error) {
  return {
    type: 'FETCH_PAGES_FAILURE',
    comicId,
    episodeId,
    error,
  }
}

export function fetchPages(comicId, episodeId) {
  return (dispatch, getState) => {
    if (!getState().pages.isFetching) {
      dispatch(fetchPagesRequest(comicId, episodeId))
      return fetch(`${SERVER_URL}/api/v1/comics/${comicId}/episodes/${episodeId}/pages`)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchPagesSuccess(comicId, episodeId, json))
          dispatch(markRead(comicId, episodeId))
        })
        .catch(err => dispatch(fetchPagesFailure(comicId, episodeId, err)))
    }
    return false
  }
}
