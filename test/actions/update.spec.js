import assert from 'assert'
import * as actions from '../../src/actions/update'

describe('update actions', () => {
  describe('updateComicDrawer', () => {
    const type = 'UPDATE_COMIC_DRAWER'
    it(`should create ${type} action`, () => {
      const open = true
      const comicId = 1
      assert.deepEqual(actions.updateComicDrawer(open, comicId), {
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
      assert.deepEqual(actions.updateComicList(offset, comicsPerPage), {
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
      assert.deepEqual(actions.updateComicViewer(comicId, episodeId), {
        type,
        payload: {
          comicId,
          episodeId,
        },
      })
    })
  })
})
