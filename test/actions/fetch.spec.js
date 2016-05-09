import assert from 'assert'
import fs from 'fs'
import nock from 'nock'

import configureMockStore from 'redux-mock-store'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'

import * as actions from '../../src/actions/fetch'

const middlewares = [
  thunkMiddleware,
  promiseMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'] }),
]
const mockStore = configureMockStore(middlewares)
const SERVER_URL = process.env.SERVER_URL

describe('fetch actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchComics', () => {
    const type = 'FETCH_COMICS'
    const query = '/api/v1/updates'
    const file = `src${query}`

    it(`should create ${type}_SUCCESS actions along with payload`, () => {
      const store = mockStore({
        comics: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      return store.dispatch(actions.fetchComics())
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_SUCCESS`)

        const data = JSON.parse(fs.readFileSync(file))
        assert.deepStrictEqual(store.getActions()[1].payload, data)
      })
    })

    it(`should create ${type}_FAILURE actions when fetching error`, () => {
      const store = mockStore({
        comics: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithError('Error')

      return store.dispatch(actions.fetchComics())
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_FAILURE`)
      })
    })

    it('should not create any actions if data is fetching', () => {
      const store = mockStore({
        comics: {
          isFetching: true,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      assert.strictEqual(store.dispatch(actions.fetchComics()), false)
    })
  })

  describe('fetchComic', () => {
    const type = 'FETCH_COMIC'
    const comicId = 1
    const query = `/api/v1/comics/${comicId}`
    const file = `src${query}/data`

    it(`should create ${type}_SUCCESS actions along with payload`, () => {
      const store = mockStore({
        comics: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      return store.dispatch(actions.fetchComic(comicId))
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_SUCCESS`)

        const data = JSON.parse(fs.readFileSync(file))
        assert.deepStrictEqual(store.getActions()[1].payload, data)
      })
    })

    it(`should create ${type}_FAILURE actions when fetching error`, () => {
      const store = mockStore({
        comics: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithError('Error')

      return store.dispatch(actions.fetchComic(comicId))
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_FAILURE`)
      })
    })

    it('should not dispatch actions if data is fetching', () => {
      const store = mockStore({
        comics: {
          isFetching: true,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      assert.strictEqual(store.dispatch(actions.fetchComic(comicId)), false)
    })
  })

  describe('fetchEpisodes', () => {
    const type = 'FETCH_EPISODES'
    const comicId = 1
    const query = `/api/v1/comics/${comicId}/episodes`
    const file = `src${query}/data`

    it(`should create ${type}_SUCCESS actions along with payload`, () => {
      const store = mockStore({
        episodes: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      return store.dispatch(actions.fetchEpisodes(comicId))
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_SUCCESS`)

        const data = JSON.parse(fs.readFileSync(file))
        assert.deepStrictEqual(store.getActions()[1].payload, data)
      })
    })

    it(`should create ${type}_FAILURE actions when fetching error`, () => {
      const store = mockStore({
        episodes: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithError('Error')

      return store.dispatch(actions.fetchEpisodes(comicId))
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_FAILURE`)
      })
    })

    it('should not dispatch actions if data is fetching', () => {
      const store = mockStore({
        episodes: {
          isFetching: true,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      assert.strictEqual(store.dispatch(actions.fetchEpisodes(comicId)), false)
    })
  })

  describe('fetchPages', () => {
    const type = 'FETCH_PAGES'
    const comicId = 1
    const episodeId = 2
    const query = `/api/v1/comics/${comicId}/episodes/${episodeId}/pages`
    const file = `src${query}/data`

    it(`should create ${type}_SUCCESS actions along with payload`, () => {
      const store = mockStore({
        pages: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      return store.dispatch(actions.fetchPages(comicId, episodeId))
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_SUCCESS`)

        const data = JSON.parse(fs.readFileSync(file))
        assert.deepStrictEqual(store.getActions()[1].payload, data)
      })
    })

    it(`should create ${type}_FAILURE actions when fetching error`, () => {
      const store = mockStore({
        pages: {
          isFetching: false,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithError('Error')

      return store.dispatch(actions.fetchPages(comicId, episodeId))
      .then(() => {
        assert.strictEqual(store.getActions()[0].type, `${type}_REQUEST`)
        assert.strictEqual(store.getActions()[1].type, `${type}_FAILURE`)
      })
    })

    it('should not dispatch actions if data is fetching', () => {
      const store = mockStore({
        pages: {
          isFetching: true,
        },
      })

      nock(SERVER_URL)
        .get(query)
        .replyWithFile(200, file)

      assert.strictEqual(
        store.dispatch(actions.fetchPages(comicId, episodeId)),
        false
      )
    })
  })
})
