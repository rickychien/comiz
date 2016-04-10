import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicList from '../components/ComicList'

import * as Actions from '../actions'

class ComicListContainer extends React.Component {

  static propTypes = {
    filter: PropTypes.object.isRequired,
    comics: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchComicsIfNeeded())
  }

  filterComics = () => {
    let { filter, comics } = this.props

    switch (filter.category) {
      case 'SHOW_FAVORITE':
        comics = comics.filter(comic => comic.favorite)
        break
    }

    return comics.filter(comic =>
      (new RegExp(filter.query || /.+/, 'i')).test(comic.title)
    )
  }

  render() {
    return (
      <ComicList comics={ this.filterComics() } />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    comics: state.comic.comics
  }
}

export default connect(
  mapStateToProps
)(ComicListContainer)
