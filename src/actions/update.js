export function updateComicDrawer(open, comicId) {
  return {
    type: 'UPDATE_COMIC_DRAWER',
    payload: {
      open,
      comicId,
    },
  }
}

export function updateComicList(offset, comicsPerPage) {
  return {
    type: 'UPDATE_COMIC_LIST',
    payload: {
      offset,
      comicsPerPage,
    },
  }
}

export function updateComicViewer(comicId, episodeId) {
  return {
    type: 'UPDATE_COMIC_VIEWER',
    payload: {
      comicId,
      episodeId,
    },
  }
}
