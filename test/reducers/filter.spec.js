import expect from 'expect'
import reducer from '../../src/reducers/filter'

describe('filter reducer', () => {
  const FILTER_CATEGORY = 'FILTER_CATEGORY'
  it(`should handle ${FILTER_CATEGORY}`, () => {
    expect(
      reducer(undefined, {
        type: FILTER_CATEGORY,
        payload: {
          category: 'favorite',
        },
      })
    ).toEqual({
      category: 'favorite',
      categories: {
        latest: 'Latest',
        favorite: 'Favorite',
      },
      query: '',
    })

    expect(
      reducer({
        category: 'favorite',
        categories: {
          latest: 'Latest',
          favorite: 'Favorite',
        },
        query: '',
      }, {
        type: FILTER_CATEGORY,
        payload: {
          category: 'latest',
        },
      })
    ).toEqual({
      category: 'latest',
      categories: {
        latest: 'Latest',
        favorite: 'Favorite',
      },
      query: '',
    })
  })

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
      category: 'latest',
      categories: {
        latest: 'Latest',
        favorite: 'Favorite',
      },
      query: 'test',
    })

    expect(
      reducer({
        category: 'favorite',
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
      category: 'favorite',
      categories: {
        latest: 'Latest',
        favorite: 'Favorite',
      },
      query: 'new test',
    })
  })
})
