import expect from 'expect'
import reducer from '../../src/reducers/comicDrawer'

describe('comicDrawer reducer', () => {
  const action = 'UPDATE_COMIC_DRAWER'
  it(`should handle ${action}`, () => {
    expect(
      reducer(undefined, {
        type: action,
        payload: {
          open: true,
          comicId: 1,
        },
      })
    ).toEqual({
      open: true,
      comicId: 1,
    })

    expect(
      reducer({
        open: true,
        comicId: 1,
      }, {
        type: action,
        payload: {
          open: false,
          comicId: 2,
        },
      })
    ).toEqual({
      open: false,
      comicId: 2,
    })

    expect(
      reducer({
        open: true,
        comicId: 1,
      }, {
        type: action,
        payload: {
          open: false,
        },
      })
    ).toEqual({
      open: false,
      comicId: 1,
    })
  })
})
