const initialState = {
  favorites: [],
  reads: []
}

function toggleFavorite(favorites, comicId) {
  let idx = favorites.indexOf(comicId)
  if (idx === -1) {
    favorites.push(comicId)
  } else {
    favorites.splice(idx, 1)
  }
  return [...favorites.sort()]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: toggleFavorite(state.favorites, action.comicId)
      }
    // TODO: Record read in user preferences
    case 'ADD_READS':
    case 'REMOVE_READS':
    default:
      return state
  }
}
