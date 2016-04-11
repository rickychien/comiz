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

  filterComics = (comics, filter, favorites) => {
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

    return comics.filter(comic => reg.test(comic.title))
  }

  render() {
    const { comics, filter, favorites, shrink } = this.props
    return (
      <ComicList
        comics={ this.filterComics(comics, filter, favorites) }
        shrink={ shrink }
      />
    )
  }

}

function mapStateToProps(state) {
  return {
    comics: state.comics.entries,
    filter: state.filter,
    favorites: state.userPrefs.favorites
  }
}

export default connect(
  mapStateToProps
)(ComicListContainer)
