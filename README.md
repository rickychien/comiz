# Comiz

[![Build Status](https://img.shields.io/travis/rickychien/comiz/master.svg?style=flat-square)](https://travis-ci.org/rickychien/comiz)
[![Coverage Status](https://img.shields.io/coveralls/rickychien/comiz/master.svg?style=flat-square)](https://coveralls.io/github/rickychien/comiz)

A fantastic comic viewer in the world.

## Prerequisites

* [node] >= 8.0
* [npm] >= 5.0
* [yarn] >= 1.0

## Techniques

* [react] - A declarative, efficient, and flexible JavaScript library for building user interfaces.
* [redux] - a predictable state container for JavaScript apps.
* [react-redux] - Official React bindings for Redux
* [react-router] - A complete routing library for React
* [redux-promise-middleware] - Redux middleware for resolving and rejecting promises with conditional optimistic updates.
* [redux-thunk] - Allows you to write action creators that return a function instead of an action.
* [webpack] - module bundler.
* [babel] - A compiler for writing next generation JavaScript.
* [css-modules] - Modulize CSS.
* [react-swipeable] - Swipe bindings for react.

## Contribute

1. Install packages by [npm] or [yarn]

  ```
  yarn install
  ```

2. Start webpack dev server

  ```
  yarn start
  ```

3. Visit <http://localhost:8000> in browser

### Development Guide

#### Development

  To enable [redux-logger] and fetch fake data from local at [src/api/](https://github.com/rickychien/comiz/blob/master/src/api/))

  ```
  yarn start
  ```

  To enable test server in development mode

  ```
  SERVER=1 yarn start
  ```

#### Production

  Production build will exclude unnecessary resources (ex: [redux-logger] only for debugging), ship with server url and minimize resources as small as possible to optimize website experience.

  ```
  yarn build
  ```

  It's up to you to spin up a local server in dist folder to see production result, for example launching a python server in dist

  ```
  python -m SimpleHTTPServer
  ```

  and go to visit <http://localhost:8000>

#### Clean dist resources
  ```
  yarn clean
  ```

#### Push to gh-pages (it requires ```yarn build``` and follow a ```git commit``` before publishing)
  ```
  yarn gh-pages
  ```

  Steps to gh-pages publish

  ```
  yarn build
  ```
  ```
  git commit new changes (including build results in dist/*)
  ```
  ```
  yarn gh-pages
  ```

## Application State Structure

```js
{
  comicDrawer: {
    open: false,
    comicId: 1
  },

  comicList: {
    offset: 0,
    comicsPerPage: 35
  },

  comicViewer: {
    comicId: 1,
    episodeId: 1
  },

  comics: {
    isFetching: false,
    fetchError: false,
    entries: {
      1: {
        id: 1,
        title: 'title1'
      },
      2: {
        id: 2,
        title: 'title2'
      }
    }
  },

  episodes: {
    comicId: 1,
    isFetching: false,
    fetchError: false,
    entries: {
      1: {
        id: 1,
        title: 'title1'
      },
      2: {
        id: 2,
        title: 'title2'
      }
    }
  },

  filter: {
    categories: {
      latest: 'Latest',
      favorite: 'favorite'
    },
    query: '<user query>'
  },

  pages: {
    comicId: 1,
    episodeId: 2,
    isFetching: false,
    fetchError: false,
    entries: [
      'http://path/to/page1',
      'http://path/to/page2'
    ]
  },

  userPrefs: {
    favorites: [1, 3, 7],
    reads: [
      {
        comicId: 1,
        episodeId: 1
      },
      {
        comicId: 1,
        episodeId: 2
      }
    ]
  }
}
```

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
[react]: https://github.com/facebook/react
[redux]: http://redux.js.org/
[react-redux]: https://github.com/reactjs/react-redux
[react-router]: https://github.com/reactjs/react-router
[redux-promise-middleware]: https://github.com/pburtchaell/redux-promise-middleware
[redux-thunk]: https://github.com/gaearon/redux-thunk
[webpack]: https://github.com/webpack/webpack
[babel]: https://github.com/babel/babel
[css-modules]: https://github.com/css-modules/css-modules
[react-swipeable]: https://github.com/dogfessional/react-swipeable
[redux-logger]: https://github.com/fcomb/redux-logger
