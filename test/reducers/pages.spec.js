import expect from 'expect'
import reducer from '../../src/reducers/pages'

describe('pages reducer', () => {
  const FETCH_PAGES_REQUEST = 'FETCH_PAGES_REQUEST'
  it(`should handle ${FETCH_PAGES_REQUEST}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_PAGES_REQUEST,
        payload: {
          comicId: 2,
          episodeId: 3,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: [],
      comicId: 2,
      episodeId: 3,
    })

    expect(
      reducer({
        isFetching: false,
        fetchError: false,
        entries: [],
        comicId: 2,
        episodeId: 3,
      }, {
        type: FETCH_PAGES_REQUEST,
        payload: {
          comicId: 1,
          episodeId: 1,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: [],
      comicId: 1,
      episodeId: 1,
    })
  })

  const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS'
  it(`should handle ${FETCH_PAGES_SUCCESS}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_PAGES_SUCCESS,
        payload: [{
          id: 1,
          title: '01',
        },
        {
          id: 2,
          title: '02',
        }],
      })
    ).toEqual({
      isFetching: false,
      fetchError: false,
      entries: [{
        id: 1,
        title: '01',
      },
      {
        id: 2,
        title: '02',
      }],
      comicId: 0,
      episodeId: 0,
    })

    expect(
      reducer({
        isFetching: true,
        fetchError: false,
        entries: [{
          id: 1,
          title: '01',
        },
        {
          id: 2,
          title: '02',
        }],
        comicId: 1,
        episodeId: 2,
      }, {
        type: FETCH_PAGES_SUCCESS,
        payload: [{
          id: 3,
          title: '03',
        },
        {
          id: 4,
          title: '04',
        }],
      })
    ).toEqual({
      isFetching: false,
      fetchError: false,
      entries: [{
        id: 3,
        title: '03',
      },
      {
        id: 4,
        title: '04',
      }],
      comicId: 1,
      episodeId: 2,
    })
  })

  const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE'
  it(`should handle ${FETCH_PAGES_FAILURE}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_PAGES_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: [],
      comicId: 0,
      episodeId: 0,
    })

    expect(
      reducer({
        isFetching: true,
        fetchError: false,
        entries: [],
        comicId: 2,
        episodeId: 3,
      }, {
        type: FETCH_PAGES_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: [],
      comicId: 2,
      episodeId: 3,
    })
  })
})
