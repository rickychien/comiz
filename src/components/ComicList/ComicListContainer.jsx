import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicList from './ComicList'

import * as Actions from '../../actions'

class ComicListContainer extends React.Component {

  static defaultProps = {
    shrink: false,
  }

  static propTypes = {
    shrink: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    comics: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object,
    filter: PropTypes.object.isRequired,
    favorites: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
    comicsPerPage: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchComics())
  }

  onPrevPageClick = () => {
    const { dispatch, offset, comicsPerPage } = this.props
    dispatch(Actions.updateComicList(offset - comicsPerPage, comicsPerPage))
  }

  onNextPageClick = () => {
    const { dispatch, offset, comicsPerPage } = this.props
    dispatch(Actions.updateComicList(offset + comicsPerPage, comicsPerPage))
    window.scrollTo(0, 0)
  }

  filterComics = (comics, filter, favorites) => {
    let reg
    try {
      reg = new RegExp(filter.query || '.+', 'i')
    } catch (err) {
      return []
    }

    let comicArray
    switch (filter.category) {
      case 'SHOW_LATEST':
        comicArray = Object.keys(comics).map(key => comics[key])
        break
      case 'SHOW_FAVORITE':
        comicArray = favorites
          .map(comicId => comics[comicId])
          .filter(comic => comic)
        break
      default:
        return []
    }

    return comicArray.filter(comic => reg.test(comic.title))
  }

  render() {
    const { comics, isFetching, fetchError, filter, favorites, shrink, offset,
            comicsPerPage } = this.props
    const filterResult = this.filterComics(comics, filter, favorites)
    const paginationResult = filterResult.slice(offset, offset + comicsPerPage)

    return (
      <ComicList
        comics={ paginationResult }
        isFetching={ isFetching }
        fetchError={ fetchError }
        shrink={ shrink }
        disablePrevPageClick={ !filterResult[offset - comicsPerPage] }
        disableNextPageClick={ !filterResult[offset + comicsPerPage] }
        onPrevPageClick={ this.onPrevPageClick }
        onNextPageClick={ this.onNextPageClick }
      />
    )
  }

}

function mapStateToProps(state) {
  return {
    comics: state.comics.entries,
    isFetching: state.comics.isFetching,
    fetchError: state.comics.fetchError,
    filter: state.filter,
    favorites: state.userPrefs.favorites,
    offset: state.comicList.offset,
    comicsPerPage: state.comicList.comicsPerPage,
  }
}

export default connect(
  mapStateToProps
)(ComicListContainer)
