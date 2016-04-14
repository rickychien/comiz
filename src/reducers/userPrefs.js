const initialState = {
  favorites: [],
  reads: []
}

function toggleFavorite(favorites, comicId) {
  const idx = favorites.indexOf(comicId)
  if (idx === -1) {
    favorites.push(comicId)
  } else {
    favorites.splice(idx, 1)
  }
  return [...favorites.sort()]
}

function markRead(reads, comicId, episodeId) {
  const found = reads.find(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))
  return found ? reads : [...reads.push({ comicId, episodeId })]
}

function unmarkRead(reads, comicId, episodeId) {
  const index = reads.findIndex(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))
  return index > 0 ? [...reads.splice(index, 1)] : reads
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: toggleFavorite(state.favorites, action.comicId)
      }
    case 'MARK_READ':
      return {
        ...state,
        favorites: markRead(state.reads, action.comicId, action.episodeId)
      }
    case 'UNMARK_READ':
      return {
        ...state,
        favorites: unmarkRead(state.reads, action.comicId, action.episodeId)
      }
    default:
      return state
  }
}
