import assert from 'assert'
import * as actions from '../../src/actions/filter'

describe('filter actions', () => {
  describe('filterCategory', () => {
    const type = 'FILTER_CATEGORY'
    it(`should create ${type} action`, () => {
      const category = 'latest'
      assert.deepEqual(actions.filterCategory(category), {
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
      assert.deepEqual(actions.filterQuery(query), {
        type,
        payload: {
          query,
        },
      })
    })
  })
})
