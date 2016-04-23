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
    this.updateComicPerPage()
    window.addEventListener('resize', this.updateComicPerPage)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateComicPerPage);
  }

  onPrevPageClick = () => {
    const { dispatch, offset, comicsPerPage } = this.props
    dispatch(Actions.updateComicList(offset - comicsPerPage))
  }

  onNextPageClick = () => {
    const { dispatch, offset, comicsPerPage } = this.props
    dispatch(Actions.updateComicList(offset + comicsPerPage))
    window.scrollTo(0, 0)
  }

  getComicsPerPage = () => {
    const screenWidth = window.innerWidth
    let imgWidth = 120

    if (screenWidth >= 340) {
      imgWidth = 135
    } else if (screenWidth >= 370) {
      imgWidth = 150
    }

    const columns = Math.floor((screenWidth - 20) / imgWidth)

    if (columns >= 8) {
      return columns * 12
    } else if (columns >= 4) {
      return columns * 8
    }

    return columns * 6
  }

  getAllComics = () => {
    const { comics, filter, favorites } = this.props
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

  updateComicPerPage = () => {
    const { dispatch, offset, comicsPerPage } = this.props
    const newComicsPerPage = this.getComicsPerPage()

    if (comicsPerPage !== newComicsPerPage) {
      dispatch(Actions.updateComicList(offset, newComicsPerPage))
    }
  }

  render() {
    const { isFetching, fetchError, shrink, offset, comicsPerPage } = this.props
    const allComics = this.getAllComics()

    return (
      <ComicList
        comics={ allComics.slice(offset, offset + comicsPerPage) }
        isFetching={ isFetching }
        fetchError={ fetchError }
        shrink={ shrink }
        disablePrevPageClick={ !allComics[offset - comicsPerPage] }
        disableNextPageClick={ !allComics[offset + comicsPerPage] }
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
