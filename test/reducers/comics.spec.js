import expect from 'expect'
import reducer from '../../src/reducers/comics'

describe('comics reducer', () => {
  const FETCH_COMICS_REQUEST = 'FETCH_COMICS_REQUEST'
  it(`should handle ${FETCH_COMICS_REQUEST}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_COMICS_REQUEST,
        payload: {
          isFetching: true,
          fetchError: false,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: new Map(),
    })

    expect(
      reducer({
        isFetching: false,
        fetchError: false,
        entries: new Map(),
      }, {
        type: FETCH_COMICS_REQUEST,
        payload: {
          isFetching: true,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: new Map(),
    })
  })

  const FETCH_COMIC_REQUEST = 'FETCH_COMIC_REQUEST'
  it(`should handle ${FETCH_COMIC_REQUEST}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_COMIC_REQUEST,
        payload: {
          isFetching: true,
          fetchError: false,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: new Map(),
    })

    expect(
      reducer({
        isFetching: false,
        fetchError: false,
        entries: new Map(),
      }, {
        type: FETCH_COMIC_REQUEST,
        payload: {
          isFetching: true,
          fetchError: false,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: new Map(),
    })
  })

  const FETCH_COMICS_SUCCESS = 'FETCH_COMICS_SUCCESS'
  it(`should handle ${FETCH_COMICS_SUCCESS}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_COMICS_SUCCESS,
        payload: [{
          id: 1,
          title: 'A title 1',
          coverUrl: 'A cover url 1',
        }, {
          id: 2,
          title: 'A title 2',
          coverUrl: 'A cover url 2',
        }],
      })
    ).toEqual({
      isFetching: false,
      fetchError: false,
      entries: new Map([
        [1, {
          id: 1,
          title: 'A title 1',
          coverUrl: 'A cover url 1',
        }],
        [2, {
          id: 2,
          title: 'A title 2',
          coverUrl: 'A cover url 2',
        }],
      ]),
    })
  })

  const FETCH_COMIC_SUCCESS = 'FETCH_COMIC_SUCCESS'
  it(`should handle ${FETCH_COMIC_SUCCESS}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_COMIC_SUCCESS,
        payload: {
          id: 1,
          title: 'A title 1',
          coverUrl: 'A cover url 1',
        },
      })
    ).toEqual({
      isFetching: false,
      fetchError: false,
      entries: new Map([
        [1, {
          id: 1,
          title: 'A title 1',
          coverUrl: 'A cover url 1',
        }],
      ]),
    })

    expect(
      reducer({
        isFetching: false,
        fetchError: false,
        entries: new Map([
          [1, {
            id: 1,
            title: 'A title 1',
            coverUrl: 'A cover url 1',
          }],
          [2, {
            id: 2,
            title: 'A title 2',
            coverUrl: 'A cover url 2',
          }],
        ]),
      }, {
        type: FETCH_COMIC_SUCCESS,
        payload: {
          id: 1,
          title: 'A title 1 - modified',
          coverUrl: 'A cover url 1 - modified',
        },
      })
    ).toEqual({
      isFetching: false,
      fetchError: false,
      entries: new Map([
        [1, {
          id: 1,
          title: 'A title 1 - modified',
          coverUrl: 'A cover url 1 - modified',
        }],
        [2, {
          id: 2,
          title: 'A title 2',
          coverUrl: 'A cover url 2',
        }],
      ]),
    })
  })

  const FETCH_COMICS_FAILURE = 'FETCH_COMICS_FAILURE'
  it(`should handle ${FETCH_COMICS_FAILURE}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_COMICS_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: new Map(),
    })

    expect(
      reducer({
        isFetching: true,
        fetchError: false,
        entries: new Map([[1, {}]]),
      }, {
        type: FETCH_COMICS_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: new Map([[1, {}]]),
    })
  })

  const FETCH_COMIC_FAILURE = 'FETCH_COMIC_FAILURE'
  it(`should handle ${FETCH_COMIC_FAILURE}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_COMIC_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: new Map(),
    })

    expect(
      reducer({
        isFetching: true,
        fetchError: false,
        entries: new Map([[1, {}]]),
      }, {
        type: FETCH_COMIC_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: new Map([[1, {}]]),
    })
  })
})
