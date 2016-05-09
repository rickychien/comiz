import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicDrawer from './ComicDrawer'

import Actions from '../../actions'

class ComicDrawerContainer extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    comicId: PropTypes.number.isRequired,
    comics: PropTypes.object.isRequired,
    episodes: PropTypes.object.isRequired,
    favorite: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillUpdate(nextProps) {
    const { open, comicId, comics, episodes, dispatch } = nextProps
    const comic = comics.entries.get(comicId)

    if (!open || !comicId) return

    if (comicId !== this.props.comicId ||
        !comics.fetchError && (!comic || !comic.author)) {
      dispatch(Actions.fetchComic(comicId))
    }

    if (comicId !== episodes.comicId) {
      dispatch(Actions.fetchEpisodes(comicId))
    }
  }

  onCloseClick = () => {
    this.props.dispatch(Actions.updateComicDrawer(false))
  }

  onFavoriteClick = () => {
    this.props.dispatch(Actions.toggleFavorite(this.props.comicId))
  }

  render() {
    const { open, comicId, comics, episodes } = this.props

    return (
      <ComicDrawer
        open={ open }
        comic={ comics.entries.get(comicId) }
        episodes={ Array.from(episodes.entries, val => val[1]).reverse() }
        favorite={ this.props.favorite }
        isFetching={ comics.isFetching || episodes.isFetching }
        fetchError={ comics.fetchError || episodes.fetchError }
        onCloseClick={ this.onCloseClick }
        onFavoriteClick={ this.onFavoriteClick }
      />
    )
  }

}

function mapStateToProps(state) {
  const { comicDrawer: { open, comicId }, comics, episodes } = state

  return {
    open,
    comicId,
    comics,
    episodes,
    favorite: state.userPrefs.favorites.indexOf(comicId) !== -1,
  }
}

export default connect(
  mapStateToProps
)(ComicDrawerContainer)
