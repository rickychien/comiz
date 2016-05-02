const initialState = {
  category: 'latest',
  categories: {
    latest: 'Latest',
    favorite: 'Favorite',
  },
  query: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FILTER_CATEGORY':
      return { ...state, category: action.payload.category }
    case 'FILTER_QUERY':
      return { ...state, query: action.payload.query }
    default:
      return state
  }
}
