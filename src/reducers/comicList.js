const initialState = {
  offset: 0,
  comicsPerPage: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMIC_LIST':
      return {
        offset: action.offset,
        comicsPerPage: action.comicsPerPage || state.comicsPerPage,
      }
    default:
      return state
  }
}
