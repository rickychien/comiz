import expect from 'expect'
import * as actions from '../../src/actions/userPrefs'

describe('userPrefs actions', () => {
  describe('toggleFavorite', () => {
    const type = 'TOGGLE_FAVORITE'
    it(`should create ${type} action`, () => {
      const comicId = true
      expect(actions.toggleFavorite(comicId)).toEqual({
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
      expect(actions.markRead(comicId, episodeId)).toEqual({
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
      expect(actions.unmarkRead(comicId, episodeId)).toEqual({
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
      expect(actions.toggleRead(comicId, episodeId)).toEqual({
        type,
        payload: {
          comicId,
          episodeId,
        },
      })
    })
  })
})
