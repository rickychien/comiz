import expect from 'expect'
import * as actions from '../../src/actions/filter'

describe('filter actions', () => {
  describe('filterCategory', () => {
    const type = 'FILTER_CATEGORY'
    it(`should create ${type} action`, () => {
      const category = 'latest'
      expect(actions.filterCategory(category)).toEqual({
        type,
        payload: {
          category,
        },
      })
    })
  })

  describe('filterQuery', () => {
    const type = 'FILTER_QUERY'
    it(`should create ${type} action`, () => {
      const query = 'test'
      expect(actions.filterQuery(query)).toEqual({
        type,
        payload: {
          query,
        },
      })
    })
  })
})
