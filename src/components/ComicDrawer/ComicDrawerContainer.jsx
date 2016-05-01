import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicDrawer from './ComicDrawer'

import * as Actions from '../../actions'

class ComicDrawerContainer extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    comicId: PropTypes.number.isRequired,
    comics: PropTypes.object.isRequired,
    episodes: PropTypes.object.isRequired,
    favorite: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    const { comicId, comics, favorite } = this.props
    const comic = nextProps.comics.entries[nextProps.comicId]

    return nextProps.comicId !== comicId ||
      (nextProps.comics.isFetching !== comics.isFetching) ||
      (comic && comic.mtime) ||
      (nextProps.comics.fetchError && nextProps.episodes.fetchError) ||
      nextProps.favorite !== favorite
  }

  componentWillUpdate(nextProps) {
    const { open, comicId, episodes, dispatch } = nextProps

    if (!open || !comicId) return

    if (comicId !== this.props.comicId) {
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
    const episodesArray = Object.keys(episodes.entries)
      .map(key => episodes.entries[key]).reverse()

    return (
      <ComicDrawer
        open={ open }
        comic={ comics.entries[comicId] }
        episodes={ episodesArray }
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
