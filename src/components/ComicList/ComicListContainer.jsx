import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ComicList from './ComicList'

import * as Actions from '../../actions'
import { App } from '../../constants'

class ComicListContainer extends React.Component {

  static defaultProps = {
    shrink: false,
  }

  static propTypes = {
    shrink: PropTypes.bool,
    comics: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object,
    filter: PropTypes.object.isRequired,
    favorites: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
    comicsPerPage: PropTypes.number.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { comics, dispatch } = this.props

    // Re-fetch when necessary
    // comic length would be 0 when user first time visits ComicList
    // comic length would be 1 if there has exact 1 comic fetched by other page
    // ex: Visit ComicList from ComicViewer along with an opened ComicDrawer
    if (Object.keys(comics).length <= 1) {
      dispatch(Actions.fetchComics())
    }

    this.onResize()

    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    const { comics, location } = this.props
    const comic = comics[location.query.id]

    document.title = comic ? `${comic.title} - ${App.title}` : App.title

    if (prevProps.shrink !== this.props.shrink) {
      this.onResize()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onScroll)
  }

  onResize = () => {
    this.props.dispatch(Actions.updateComicList(null, this.getComicsPerPage()))
  }

  onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.props.dispatch(Actions.updateComicList(this.props.offset + 1))
    }
  }

  onComicItemClick = (comicId) => {
    const { location, dispatch } = this.props
    dispatch(push({ query: { ...location.query, id: comicId } }))
  }

  getComicsPerPage = () => {
    let screenWidth = window.innerWidth
    screenWidth = this.props.shrink ? screenWidth - 300 : screenWidth
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

  render() {
    const { isFetching, fetchError, shrink, offset, comicsPerPage } = this.props

    return (
      <ComicList
        comics={ this.getAllComics().slice(0, offset * comicsPerPage) }
        isFetching={ isFetching }
        fetchError={ fetchError }
        shrink={ shrink }
        onComicItemClick={ this.onComicItemClick }
      />
    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
    comics: state.comics.entries,
    isFetching: state.comics.isFetching,
    fetchError: state.comics.fetchError,
    shrink: !!ownProps.location.query.id,
    filter: state.filter,
    favorites: state.userPrefs.favorites,
    offset: state.comicList.offset,
    comicsPerPage: state.comicList.comicsPerPage,
  }
}

export default connect(
  mapStateToProps
)(ComicListContainer)
