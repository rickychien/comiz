import assert from 'assert'
import * as actions from '../../src/actions/userPrefs'

describe('userPrefs actions', () => {
  describe('toggleFavorite', () => {
    const type = 'TOGGLE_FAVORITE'
    it(`should create ${type} action`, () => {
      const comicId = true
      assert.deepEqual(actions.toggleFavorite(comicId), {
        type,
        payload: {
          comicId,
        },
      })
    })
  })

  describe('markRead', () => {
    const type = 'MARK_READ'
    it(`should create ${type} action`, () => {
      const comicId = 2
      const episodeId = 30
      assert.deepEqual(actions.markRead(comicId, episodeId), {
        type,
        payload: {
          comicId,
          episodeId,
        },
      })
    })
  })

  describe('unmarkRead', () => {
    const type = 'UNMARK_READ'
    it(`should create ${type} action`, () => {
      const comicId = 2
      const episodeId = 3
      assert.deepEqual(actions.unmarkRead(comicId, episodeId), {
        type,
        payload: {
          comicId,
          episodeId,
        },
      })
    })
  })

  describe('toggleRead', () => {
    const type = 'TOGGLE_READ'
    it(`should create ${type} action`, () => {
      const comicId = 2
      const episodeId = 3
      assert.deepEqual(actions.toggleRead(comicId, episodeId), {
        type,
        payload: {
          comicId,
          episodeId,
        },
      })
    })
  })
})
