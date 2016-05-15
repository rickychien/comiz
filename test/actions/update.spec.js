import expect from 'expect'
import * as actions from '../../src/actions/update'

describe('update actions', () => {
  describe('updateComicDrawer', () => {
    const type = 'UPDATE_COMIC_DRAWER'
    it(`should create ${type} action`, () => {
      const open = true
      const comicId = 1
      expect(actions.updateComicDrawer(open, comicId)).toEqual({
        type,
        payload: {
          open,
          comicId,
        },
      })
    })
  })

  describe('updateComicList', () => {
    const type = 'UPDATE_COMIC_LIST'
    it(`should create ${type} action`, () => {
      const offset = 2
      const comicsPerPage = 30
      expect(actions.updateComicList(offset, comicsPerPage)).toEqual({
        type,
        payload: {
          offset,
          comicsPerPage,
        },
      })
    })
  })

  describe('updateComicViewer', () => {
    const type = 'UPDATE_COMIC_VIEWER'
    it(`should create ${type} action`, () => {
      const comicId = 2
      const episodeId = 3
      expect(actions.updateComicViewer(comicId, episodeId)).toEqual({
        type,
        payload: {
          comicId,
          episodeId,
        },
      })
    })
  })
})
