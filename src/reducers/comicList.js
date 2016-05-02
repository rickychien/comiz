const initialState = {
  offset: 1,
  comicsPerPage: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMIC_LIST':
      return {
        offset: action.payload.offset || state.offset,
        comicsPerPage: action.payload.comicsPerPage || state.comicsPerPage,
      }
    default:
      return state
  }
}
