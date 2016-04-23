# Comiz

[![Build Status](https://img.shields.io/travis/rickychien/comiz/master.svg?style=flat-square)](https://travis-ci.org/rickychien/comiz)

A fantastic comic viewer in the world.

## Prerequisites

* [node] >= 5.x
* [npm] >= 3.x

## Techniques

* [react] - A declarative, efficient, and flexible JavaScript library for building user interfaces.
* [redux] - a predictable state container for JavaScript apps.
* [webpack] - module bundler.
* [babel] - A compiler for writing next generation JavaScript.
* [css-modules] - Modulize CSS.
* [react-swipeable] - Swipe bindings for react.

## Contribute

1. Install npm packages
  ```
  npm install
  ```

2. Start webpack dev server
  ```
  npm start
  ```

3. Visit <http://localhost:3990> in browser

### Development Guide

#### Run on DEBUG mode (default)
  ```
  npm start
  ```
it will enable [redux-logger] and fetch fake data from local at [src/api/](https://github.com/rickychien/comiz/blob/master/src/api/))

#### Run on DEBUG mode with accessing to server
  ```
  DEBUG=SERVER npm start
  ```
it runs DEBUG mode as well as accessing to server and fetch data from server which url is defined at [src/actions/index.js](https://github.com/rickychien/comiz/blob/master/src/actions/index.js#L2)

#### Build with production

  Production build will exclude unnecessary resources, setup server url and minimize resources size as small as possible to optimize website experience.

#### Package all dist resources into ./dist/* (it also run clean before packaging)
  ```
  npm run build
  ```

  It's up to you to spin up a local server in dist folder to see production result, for example launching a python server

  ```
  python -m SimpleHTTPServer
  ```
  and go to visit <http://localhost:8000>

#### Clean dist resources
  ```
  npm run clean
  ```

#### Push to gh-pages (it requires ```npm run build``` and follow a ```git commit``` before publishing)
  ```
  npm run gh-pages
  ```

  Steps to gh-pages publish

  1. npm run build
  2. git commit new changes (including build results in dist/*)
  3. npm run gh-pages

## Application State Structure

```js
{
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

  comicDrawer: {
    open: false,
    comicId: 1
  },

  comicList: {
    offset: 0,
    comicsPerPage: 35
  },

  comicViewer: {
    open: false,
    comicId: 1,
    episodeId: 1
  },

  filter: {
    category: 'SHOW_LATEST',
    categories: {
      SHOW_LATEST: 'Latest',
      SHOW_FAVORITE: 'favorite'
    },
    query: 'user query string'
  }
}
```

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[react]: https://github.com/facebook/react
[redux]: http://redux.js.org/
[webpack]: https://github.com/webpack/webpack
[babel]: https://github.com/babel/babel
[css-modules]: https://github.com/css-modules/css-modules
[react-swipeable]: https://github.com/dogfessional/react-swipeable
[redux-logger]: https://github.com/fcomb/redux-logger
