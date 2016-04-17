# Comiz

[![Build Status](https://img.shields.io/travis/rickychien/comiz/master.svg?style=flat-square)](https://travis-ci.org/rickychien/comiz)

A playground

## Prerequisites

* [node] >= 5.9.x
* [npm] >= 3.7.x

## Techniques

* [react] - A declarative, efficient, and flexible JavaScript library for building user interfaces.
* [redux] - a predictable state container for JavaScript apps.
* [webpack] - module bundler.
* [babel] - A compiler for writing next generation JavaScript.
* [css-modules] - Modulize CSS.
* [react-event-listener] - A React component for binding events on the global scope.
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

3. Open up <http://localhost:3990> in browser

#### Note:

Comiz fetches a fake self hosted data by default otherwise you could set

```js
const DEVELOPMENT = false

```
in src/actions/index.js line 1.

### Build static resources

* Package all static resources into ./static/*
  ```
  npm run build
  ```
* Clean static resources
  ```
  npm run clean
  ```

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
[react-event-listener]: https://github.com/oliviertassinari/react-event-listener
[react-swipeable]: https://github.com/dogfessional/react-swipeable
