const filter = (state = {
  category: 'SHOW_LATEST',
  query: ''
}, action) => {
  switch (action.type) {
    case 'FILTER_CATEGORY':
      return Object.assign({}, state, {
        category: action.category
      })
    case 'FILTER_QUERY':
      return Object.assign({}, state, {
        query: action.query
      })
    default:
      return state
  }
}

export default filter
