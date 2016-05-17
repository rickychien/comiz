import expect from 'expect'
import reducer from '../../src/reducers/episodes'

describe('episodes reducer', () => {
  const FETCH_EPISODES_REQUEST = 'FETCH_EPISODES_REQUEST'
  it(`should handle ${FETCH_EPISODES_REQUEST}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_EPISODES_REQUEST,
        payload: {
          comicId: 3,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: new Map(),
      comicId: 3,
    })

    expect(
      reducer({
        isFetching: false,
        fetchError: false,
        entries: new Map(),
        comicId: 3,
      }, {
        type: FETCH_EPISODES_REQUEST,
        payload: {
          comicId: 5,
        },
      })
    ).toEqual({
      isFetching: true,
      fetchError: false,
      entries: new Map(),
      comicId: 5,
    })
  })

  const FETCH_EPISODES_SUCCESS = 'FETCH_EPISODES_SUCCESS'
  it(`should handle ${FETCH_EPISODES_SUCCESS}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_EPISODES_SUCCESS,
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
      entries: new Map([
        [1, {
          id: 1,
          title: '01',
        }],
        [2, {
          id: 2,
          title: '02',
        }],
      ]),
      comicId: 0,
    })

    expect(
      reducer({
        isFetching: true,
        fetchError: false,
        entries: new Map(),
        comicId: 2,
      }, {
        type: FETCH_EPISODES_SUCCESS,
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
      entries: new Map([
        [1, {
          id: 1,
          title: '01',
        }],
        [2, {
          id: 2,
          title: '02',
        }],
      ]),
      comicId: 2,
    })
  })

  const FETCH_EPISODES_FAILURE = 'FETCH_EPISODES_FAILURE'
  it(`should handle ${FETCH_EPISODES_FAILURE}`, () => {
    expect(
      reducer(undefined, {
        type: FETCH_EPISODES_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: new Map(),
      comicId: 0,
    })

    expect(
      reducer({
        isFetching: true,
        fetchError: false,
        entries: new Map([[1, {}]]),
        comicId: 2,
      }, {
        type: FETCH_EPISODES_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      fetchError: true,
      entries: new Map([[1, {}]]),
      comicId: 2,
    })
  })
})
