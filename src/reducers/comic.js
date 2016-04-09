const item = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_COMICS':
      return Object.assign({}, state, { favorite: false })
    case 'RECEIVE_COMIC_ITEM':
      if (state.id !== action.item.id) {
        return state
      }
      return Object.assign({}, state, { favorite: false }, action.item)
  }
}

const comic = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'REQUEST_COMICS':
      return Object.assign({}, state, { isFetching: true })
    case 'RECEIVE_COMICS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items.map(c => item(c, action))
      })
    case 'RECEIVE_COMIC_ITEM':
      return Object.assign({}, state, {
        items: state.items.map(c => item(c, action))
      })
    default:
      return state
  }
}

export default comic
