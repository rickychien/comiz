import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicList from './ComicList'

import Actions from '../../actions'
import { App } from '../../constants'

class ComicListContainer extends React.Component {

  static propTypes = {
    comics: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
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
    if (comics.size <= 1) {
      dispatch(Actions.fetchComics())
    }

    this.onResize()
    document.title = App.title

    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onScroll)
  }

  onResize = () => {
    const comicsPerPage = this.getComicsPerPage()
    if (comicsPerPage !== this.props.comicsPerPage) {
      this.props.dispatch(Actions.updateComicList(null, comicsPerPage))
    }
  }

  onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.props.dispatch(Actions.updateComicList(this.props.offset + 1))
    }
  }

  onComicItemClick = (comicId) => {
    this.props.dispatch(Actions.updateComicDrawer(true, comicId))
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

    let items
    switch (filter.category) {
      case 'latest':
        items = Array.from(comics, val => val[1])
        break
      case 'favorite':
        items = favorites.map(comics.get.bind(comics)).filter(comic => comic)
        break
      default:
        return []
    }

    return items.filter(comic => reg.test(comic.title))
  }

  render() {
    const { isFetching, fetchError, offset, comicsPerPage } = this.props

    return (
      <ComicList
        comics={ this.getAllComics().slice(0, offset * comicsPerPage) }
        isFetching={ isFetching }
        fetchError={ fetchError }
        onComicItemClick={ this.onComicItemClick }
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
