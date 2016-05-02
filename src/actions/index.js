const HOST = process.env.SERVER_URL

export function toggleFavorite(comicId) {
  return {
    type: 'TOGGLE_FAVORITE',
    payload: {
      comicId,
    },
  }
}

export function markRead(comicId, episodeId) {
  return {
    type: 'MARK_READ',
    payload: {
      comicId,
      episodeId,
    },
  }
}

export function unmarkRead(comicId, episodeId) {
  return {
    type: 'UNMARK_READ',
    payload: {
      comicId,
      episodeId,
    },
  }
}

export function toggleRead(comicId, episodeId) {
  return {
    type: 'TOGGLE_READ',
    payload: {
      comicId,
      episodeId,
    },
  }
}

export function filterCategory(category) {
  return {
    type: 'FILTER_CATEGORY',
    payload: {
      category,
    },
  }
}

export function filterQuery(query) {
  return {
    type: 'FILTER_QUERY',
    payload: {
      query,
    },
  }
}

export function updateComicDrawer(open, comicId) {
  return {
    type: 'UPDATE_COMIC_DRAWER',
    payload: {
      open,
      comicId,
    },
  }
}

export function updateComicList(offset, comicsPerPage) {
  return {
    type: 'UPDATE_COMIC_LIST',
    payload: {
      offset,
      comicsPerPage,
    },
  }
}

export function updateComicViewer(comicId, episodeId) {
  return {
    type: 'UPDATE_COMIC_VIEWER',
    payload: {
      comicId,
      episodeId,
    },
  }
}

export function fetchComics() {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_COMICS',
        payload: {
          promise: new Promise((resolve, reject) => {
            fetch(`${HOST}/api/v1/updates`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject)
          }),
        },
      }).catch(() => {})
    }
    return false
  }
}

export function fetchComic(comicId) {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_COMIC',
        payload: new Promise((resolve, reject) => {
          fetch(`${HOST}/api/v1/comics/${comicId}`)
          .then(response => response.json())
          .then(resolve)
          .catch(reject)
        }),
      }).catch(() => {})
    }
    return false
  }
}

export function fetchEpisodes(comicId) {
  return (dispatch, getState) => {
    if (!getState().episodes.isFetching) {
      return dispatch({
        type: 'FETCH_EPISODES',
        payload: {
          data: {
            comicId,
          },
          promise: new Promise((resolve, reject) => {
            fetch(`${HOST}/api/v1/comics/${comicId}/episodes`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject)
          }),
        },
      }).catch(() => {})
    }
    return false
  }
}

export function fetchPages(comicId, episodeId) {
  return (dispatch, getState) => {
    if (!getState().pages.isFetching) {
      return dispatch({
        type: 'FETCH_PAGES',
        payload: {
          data: {
            comicId,
            episodeId,
          },
          promise: new Promise((resolve, reject) => {
            fetch(`${HOST}/api/v1/comics/${comicId}/episodes/${episodeId}/pages`)
            .then(response => response.json())
            .then(response => {
              dispatch(markRead(comicId, episodeId))
              resolve(response)
            })
            .catch(reject)
          }),
        },
      }).catch(() => {})
    }
    return false
  }
}
