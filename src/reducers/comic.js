const item = (state, action) => (
  Object.assign({}, state, {
    favorite: false
  })
)

const comic = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'REQUEST_COMICS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_COMICS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items.map(c => item(c, action)),
        lastUpdated: action.lastUpdated
      })
    default:
      return state
  }
}

export default comic
