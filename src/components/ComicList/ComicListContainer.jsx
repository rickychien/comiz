import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import ComicList from './ComicList'

import * as Actions from '../../actions'

class ComicListContainer extends React.Component {

  static defaultProps = {
    shrink: false,
    offset: 0,
  }

  static propTypes = {
    shrink: PropTypes.bool,
    comics: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object,
    filter: PropTypes.object.isRequired,
    favorites: PropTypes.array.isRequired,
    offset: PropTypes.number,
    comicsPerPage: PropTypes.number.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch, comics, location, offset } = this.props
    browserHistory.push({ query: { ...location.query, offset } })
    if (Object.keys(comics).length === 0) {
      dispatch(Actions.fetchComics())
    }
    this.updateComicPerPage()
    window.addEventListener('resize', this.updateComicPerPage)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateComicPerPage);
  }

  onPrevPageClick = () => this.goNextComicsByOffset(-1)

  onNextPageClick = () => this.goNextComicsByOffset(+1)

  onComicItemClick = (comicId) => {
    const { location } = this.props
    browserHistory.push({ query: { ...location.query, id: comicId } })
  }

  getComicsPerPage = () => {
    const screenWidth = window.innerWidth
    let imgWidth = 120

    if (screenWidth >= 370) {
      imgWidth = 150
    } else if (screenWidth >= 340) {
      imgWidth = 135
    }

    const imgMargin = 26
    const columns = Math.floor((screenWidth - 20) / (imgWidth + imgMargin))

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

  goNextComicsByOffset = (val) => {
    const { dispatch, offset, location } = this.props
    const newOffset = offset + val
    dispatch(Actions.updateComicList(newOffset))
    browserHistory.push({ query: { ...location.query, offset: newOffset } })
    window.scrollTo(0, 0)
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
    const idx = offset * comicsPerPage

    return (
      <ComicList
        comics={ allComics.slice(idx, (offset + 1) * comicsPerPage) }
        isFetching={ isFetching }
        fetchError={ fetchError }
        shrink={ shrink }
        disablePrevPageClick={ !allComics[idx - comicsPerPage] }
        disableNextPageClick={ !allComics[idx + comicsPerPage] }
        onPrevPageClick={ this.onPrevPageClick }
        onNextPageClick={ this.onNextPageClick }
        onComicItemClick={ this.onComicItemClick }
      />
    )
  }

}

function mapStateToProps(state, ownProps) {
  const { offset, comicsPerPage } = state.comicList
  return {
    comics: state.comics.entries,
    isFetching: state.comics.isFetching,
    fetchError: state.comics.fetchError,
    filter: state.filter,
    favorites: state.userPrefs.favorites,
    offset: parseInt(ownProps.location.query.offset, 10) || offset,
    comicsPerPage,
  }
}

export default connect(
  mapStateToProps
)(ComicListContainer)
