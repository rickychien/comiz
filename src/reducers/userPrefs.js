const initialState = {
  favorites: [],
  reads: [],
}

function toggleFavorite(favorites, comicId) {
  const idx = favorites.indexOf(comicId)
  if (idx === -1) {
    favorites.push(comicId)
  } else {
    favorites.splice(idx, 1)
  }
  localStorage.setItem('userPrefs.favorites', JSON.stringify(favorites.sort()))
  return [...favorites]
}

function markRead(reads, comicId, episodeId) {
  const found = reads.find(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))
  if (!found) {
    reads.push({ comicId, episodeId })
    localStorage.setItem('userPrefs.reads', JSON.stringify(reads))
  }
  return [...reads]
}

function unmarkRead(reads, comicId, episodeId) {
  const index = reads.findIndex(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))
  if (index !== -1) {
    reads.splice(index, 1)
    localStorage.setItem('userPrefs.reads', JSON.stringify(reads))
  }
  return [...reads]
}

function toggleRead(reads, comicId, episodeId) {
  const found = reads.find(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))

  return found ?
    unmarkRead(reads, comicId, episodeId) : markRead(reads, comicId, episodeId)
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: toggleFavorite(state.favorites, action.payload.comicId),
      }
    case 'FETCH_PAGES_SUCCESS':
    case 'MARK_READ':
      return {
        ...state,
        reads: markRead(state.reads, action.payload.comicId, action.payload.episodeId),
      }
    case 'UNMARK_READ':
      return {
        ...state,
        reads: unmarkRead(state.reads, action.payload.comicId, action.payload.episodeId),
      }
    case 'TOGGLE_READ':
      return {
        ...state,
        reads: toggleRead(state.reads, action.payload.comicId, action.payload.episodeId),
      }
    default:
      return state
  }
}
