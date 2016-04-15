import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicList from './ComicList'

import * as Actions from '../../actions'

class ComicListContainer extends React.Component {

  static defaultProps = {
    shrink: false
  }

  static propTypes = {
    shrink: PropTypes.bool
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchComics())
  }

  filterComics = (comics, filter, favorites, offset, comicsPerPage) => {
    let reg
    try {
      reg = new RegExp(filter.query || '.+', 'i')
    } catch (err) {
      return []
    }

    switch (filter.category) {
      case 'SHOW_LATEST':
        comics = Object.keys(comics).map(key => comics[key])
        break
      case 'SHOW_FAVORITE':
        comics = favorites.map(comicId => comics[comicId])
        break
    }

    return comics
      .filter(comic => reg.test(comic.title))
      .slice(offset, offset + comicsPerPage)
  }

  onPrevPageClick = () => {
    const { dispatch, offset, comicsPerPage } = this.props
    dispatch(Actions.updateComicList(offset - comicsPerPage, comicsPerPage))
  }

  onNextPageClick = () => {
    const { dispatch, offset, comicsPerPage } = this.props
    dispatch(Actions.updateComicList(offset + comicsPerPage, comicsPerPage))
  }

  render() {
    let { comics, filter, favorites, shrink, offset,
          comicsPerPage } = this.props
    let result = this.filterComics(comics, filter, favorites,
                                   offset, comicsPerPage)
    comics = Object.keys(comics)
    return (
      <ComicList
        comics={ result }
        shrink={ shrink }
        disablePrevPageClick={ !comics[offset - comicsPerPage] }
        disableNextPageClick={ !comics[offset + comicsPerPage] }
        onPrevPageClick={ this.onPrevPageClick }
        onNextPageClick={ this.onNextPageClick }
      />
    )
  }

}

function mapStateToProps(state) {
  return {
    comics: state.comics.entries,
    filter: state.filter,
    favorites: state.userPrefs.favorites,
    offset: state.comicList.offset,
    comicsPerPage: state.comicList.comicsPerPage
  }
}

export default connect(
  mapStateToProps
)(ComicListContainer)
