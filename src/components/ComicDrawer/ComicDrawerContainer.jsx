import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicDrawer from './ComicDrawer'

import * as Actions from '../../actions'

class ComicDrawerContainer extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    comic: PropTypes.object.isRequired,
    episodes: PropTypes.array.isRequired,
    favorite: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.object,
    onCloseClick: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comic.id !== this.props.comic.id ||
        (nextProps.open && !this.props.open)) {
      const { dispatch, comic } = nextProps
      dispatch(Actions.fetchComic(comic.id))
      dispatch(Actions.fetchEpisodes(comic.id))
    }
  }

  onCloseClick = () => {
    this.props.dispatch(Actions.hideComicDrawer())
  }

  onFavoriteClick = () => {
    this.props.dispatch(Actions.toggleFavorite(this.props.comic.id))
  }

  render() {
    return (
      <ComicDrawer
        open={ this.props.open }
        comic={ this.props.comic }
        episodes={ this.props.episodes }
        favorite={ this.props.favorite }
        isFetching={ this.props.isFetching }
        fetchError={ this.props.fetchError }
        onCloseClick={ this.onCloseClick }
        onFavoriteClick={ this.onFavoriteClick }
      />
    )
  }

}

function mapStateToProps(state) {
  const { open, comicId } = state.comicDrawer
  const { isFetching, fetchError } = state.comics
  const comic = state.comics.entries[comicId] || {}
  let episodes = state.episodes.entries
  episodes = Object.keys(episodes).map(key => episodes[key]).reverse()

  return {
    open,
    isFetching,
    fetchError,
    comic,
    episodes,
    favorite: state.userPrefs.favorites.indexOf(comicId) !== -1,
  }
}

export default connect(
  mapStateToProps
)(ComicDrawerContainer)
