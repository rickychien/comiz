import expect from 'expect'
import * as actions from '../../src/actions/filter'

describe('filter actions', () => {
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
