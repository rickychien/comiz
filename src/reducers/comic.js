const episodeItem = (state, action) => {
  switch (action.type) {
    case 'FETCH_COMIC_EPISODES_SUCCESS':
      return Object.assign({}, state, {
        read: false
      })
    default:
      return state
  }
}

const comicItem = (state, action) => {
  switch (action.type) {
    case 'FETCH_COMICS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        favorite: false
      })
    case 'FETCH_COMIC_ITEM_SUCCESS':
      return Object.assign({}, state, action.comic)
    case 'FETCH_COMIC_EPISODES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: null
      })
    case 'FETCH_COMIC_EPISODES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        episodes: action.episodes.map(episode => episodeItem(episode, action))
      })
    case 'FETCH_COMIC_EPISODES_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.error
      })
    case 'TOGGLE_FAVORITE':
      return Object.assign({}, state, { favorite: !state.favorite })
    default:
      return state
  }
}

const comic = (state = {
  isFetching: false,
  fetchError: null,
  comics: []
}, action) => {
  switch (action.type) {
    case 'FETCH_COMICS_REQUEST':
    case 'FETCH_COMIC_ITEM_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: null
      })
    case 'FETCH_COMICS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        comics: action.comics.map(comic => comicItem(comic, action))
      })
    case 'FETCH_COMIC_ITEM_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        comics: state.comics.map(comic => (
          comic.id === action.comic.id ? comicItem(comic, action) : comic
        ))
      })
    case 'FETCH_COMICS_FAILURE':
    case 'FETCH_COMIC_ITEM_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.error
      })
    case 'FETCH_COMIC_EPISODES_REQUEST':
    case 'FETCH_COMIC_EPISODES_SUCCESS':
    case 'FETCH_COMIC_EPISODES_FAILURE':
    case 'TOGGLE_FAVORITE':
      return Object.assign({}, state, {
        comics: state.comics.map(comic => (
          comic.id === action.comicId ? comicItem(comic, action) : comic
        ))
      })
    default:
      return state
  }
}

export default comic
