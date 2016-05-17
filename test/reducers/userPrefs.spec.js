import expect from 'expect'
import reducer from '../../src/reducers/userPrefs'

describe('userPrefs reducer', () => {
  before(() => {
    global.localStorage = {
      setItem: () => {},
    }
  })

  after(() => {
    delete global.localStorage
  })

  const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
  it(`should handle ${TOGGLE_FAVORITE}`, () => {
    expect(
      reducer(undefined, {
        type: TOGGLE_FAVORITE,
        payload: {
          comicId: 1,
        },
      })
    ).toEqual({
      favorites: [1],
      reads: [],
    })

    expect(
      reducer({
        favorites: [1, 3],
        reads: [],
      }, {
        type: TOGGLE_FAVORITE,
        payload: {
          comicId: 1,
        },
      })
    ).toEqual({
      favorites: [3],
      reads: [],
    })
  })

  const MARK_READ = 'MARK_READ'
  it(`should handle ${MARK_READ} (FETCH_PAGES_SUCCESS)`, () => {
    expect(
      reducer(undefined, {
        type: MARK_READ,
        payload: {
          comicId: 1,
          episodeId: 2,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 2,
      }],
    })

    expect(
      reducer({
        favorites: [],
        reads: [{
          comicId: 1,
          episodeId: 2,
        }, {
          comicId: 1,
          episodeId: 3,
        }],
      }, {
        type: MARK_READ,
        payload: {
          comicId: 1,
          episodeId: 2,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 2,
      }, {
        comicId: 1,
        episodeId: 3,
      }],
    })

    expect(
      reducer({
        favorites: [],
        reads: [{
          comicId: 1,
          episodeId: 2,
        }, {
          comicId: 1,
          episodeId: 3,
        }],
      }, {
        type: MARK_READ,
        payload: {
          comicId: 2,
          episodeId: 4,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 2,
      }, {
        comicId: 1,
        episodeId: 3,
      }, {
        comicId: 2,
        episodeId: 4,
      }],
    })
  })

  const UNMARK_READ = 'UNMARK_READ'
  it(`should handle ${UNMARK_READ}`, () => {
    expect(
      reducer(undefined, {
        type: UNMARK_READ,
        payload: {
          comicId: 1,
          episodeId: 2,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [],
    })

    expect(
      reducer({
        favorites: [],
        reads: [{
          comicId: 1,
          episodeId: 2,
        }, {
          comicId: 1,
          episodeId: 3,
        }],
      }, {
        type: UNMARK_READ,
        payload: {
          comicId: 1,
          episodeId: 2,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 3,
      }],
    })

    expect(
      reducer({
        favorites: [],
        reads: [{
          comicId: 1,
          episodeId: 2,
        }, {
          comicId: 1,
          episodeId: 3,
        }],
      }, {
        type: UNMARK_READ,
        payload: {
          comicId: 2,
          episodeId: 4,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 2,
      }, {
        comicId: 1,
        episodeId: 3,
      }],
    })
  })

  const TOGGLE_READ = 'TOGGLE_READ'
  it(`should handle ${TOGGLE_READ}`, () => {
    expect(
      reducer(undefined, {
        type: TOGGLE_READ,
        payload: {
          comicId: 1,
          episodeId: 2,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 2,
      }],
    })

    expect(
      reducer({
        favorites: [],
        reads: [{
          comicId: 1,
          episodeId: 2,
        }, {
          comicId: 1,
          episodeId: 3,
        }],
      }, {
        type: TOGGLE_READ,
        payload: {
          comicId: 1,
          episodeId: 2,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 3,
      }],
    })

    expect(
      reducer({
        favorites: [],
        reads: [{
          comicId: 1,
          episodeId: 2,
        }, {
          comicId: 1,
          episodeId: 3,
        }],
      }, {
        type: TOGGLE_READ,
        payload: {
          comicId: 2,
          episodeId: 4,
        },
      })
    ).toEqual({
      favorites: [],
      reads: [{
        comicId: 1,
        episodeId: 2,
      }, {
        comicId: 1,
        episodeId: 3,
      }, {
        comicId: 2,
        episodeId: 4,
      }],
    })
  })
})
