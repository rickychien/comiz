import expect from 'expect'
import reducer from '../../src/reducers/filter'

describe('filter reducer', () => {
  const FILTER_QUERY = 'FILTER_QUERY'
  it(`should handle ${FILTER_QUERY}`, () => {
    expect(
      reducer(undefined, {
        type: FILTER_QUERY,
        payload: {
          query: 'test',
        },
      })
    ).toEqual({
      categories: {
        latest: 'Latest',
        favorite: 'Favorite',
      },
      query: 'test',
    })

    expect(
      reducer({
        categories: {
          latest: 'Latest',
          favorite: 'Favorite',
        },
        query: 'test',
      }, {
        type: FILTER_QUERY,
        payload: {
          query: 'new test',
        },
      })
    ).toEqual({
      categories: {
        latest: 'Latest',
        favorite: 'Favorite',
      },
      query: 'new test',
    })
  })
})
