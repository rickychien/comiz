import expect from 'expect'
import reducer from '../../src/reducers/comicViewer'

describe('comicViewer reducer', () => {
  const action = 'UPDATE_COMIC_VIEWER'
  it(`should handle ${action}`, () => {
    expect(
      reducer(undefined, {
        type: action,
        payload: {
          comicId: 2,
          episodeId: 3,
        },
      })
    ).toEqual({
      comicId: 2,
      episodeId: 3,
    })

    expect(
      reducer({
        comicId: 2,
        episodeId: 3,
      }, {
        type: action,
        payload: {
          comicId: 5,
          episodeId: 5,
        },
      })
    ).toEqual({
      comicId: 5,
      episodeId: 5,
    })
  })
})
