const initialState = {
  categories: {
    latest: 'Latest',
    favorite: 'Favorite',
  },
  query: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FILTER_QUERY':
      return { ...state, query: action.payload.query }
    default:
      return state
  }
}
