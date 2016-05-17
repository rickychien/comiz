import expect from 'expect'
import reducer from '../../src/reducers/comicList'

describe('comicList reducer', () => {
  const action = 'UPDATE_COMIC_LIST'
  it(`should handle ${action}`, () => {
    expect(
      reducer(undefined, {
        type: action,
        payload: {
          offset: 2,
          comicsPerPage: 30,
        },
      })
    ).toEqual({
      offset: 2,
      comicsPerPage: 30,
    })

    expect(
      reducer({
        offset: 2,
        comicsPerPage: 30,
      }, {
        type: action,
        payload: {
          offset: 3,
          comicsPerPage: 60,
        },
      })
    ).toEqual({
      offset: 3,
      comicsPerPage: 60,
    })

    expect(
      reducer({
        offset: 2,
        comicsPerPage: 30,
      }, {
        type: action,
        payload: {
          offset: null,
          comicsPerPage: null,
        },
      })
    ).toEqual({
      offset: 2,
      comicsPerPage: 30,
    })
  })
})
