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
