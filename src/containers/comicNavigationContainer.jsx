import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicNavigation from '../components/ComicNavigation'

import * as Actions from '../actions'

class ComicNavigationContainer extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    comicId: PropTypes.number.isRequired,
    comics: PropTypes.array.isRequired,
    episodes: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comicId !== this.props.comicId) {
      const { dispatch, comicId } = nextProps
      dispatch(Actions.fetchComicItemIfNeeded(comicId))
    }
  }

  onCloseClick = () => {
    this.props.dispatch(Actions.hideComicNavigation())
  }

  onFavoriteClick = () => {

  }

  getComicByComicId = (comicId) => {
    return this.props.comics.find(comic => comic.id === comicId)
  }

  render() {
    return (
      <ComicNavigation
        open={ this.props.open }
        comic={ this.getComicByComicId(this.props.comicId) }
        episodes={ this.props.episodes }
        isFetching={ this.props.isFetching }
        fetchError={ this.props.fetchError }
        onCloseClick={ this.onCloseClick }
        onFavoriteClick={ this.onFavoriteClick }
      />
    )
  }

}

const mapStateToProps = (state) => {
  const { open, comicId, isFetching, fetchError } = state.comicNavigation
  return {
    open,
    comicId,
    comics: state.comic.items,
    isFetching,
    fetchError
  }
}

export default connect(
  mapStateToProps
)(ComicNavigationContainer)
