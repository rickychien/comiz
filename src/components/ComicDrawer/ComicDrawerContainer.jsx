import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
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

  componentDidMount() {
    this.handleDataFetch()
  }

  componentWillUpdate(nextProps) {
    this.handleDataFetch(nextProps)
  }

  onCloseClick = () => {
    const { pathname, search } = location
    browserHistory.push(pathname + search.replace(/id=[\d]+&?/, ''))
  }

  onFavoriteClick = () => {
    this.props.dispatch(Actions.toggleFavorite(this.props.comicId))
  }

  handleDataFetch = (nextProps) => {
    const { dispatch, open, comicId, episodes, comicDrawer } =
          nextProps || this.props
    if (!open || !comicId) return

    if (nextProps) {
      if (comicId !== this.props.comicId) {
        dispatch(Actions.fetchComic(comicId))
      }
    } else {
      // This part only enter when componentDidMount
      const timer = setInterval(() => {
        if (!this.props.comics.isFetching) {
          clearInterval(timer)
          dispatch(Actions.fetchComic(comicId))
        }
      }, 100)
    }

    if (comicId !== episodes.comicId) {
      dispatch(Actions.fetchEpisodes(comicId))
    }

    if (comicId !== comicDrawer.comicId) {
      dispatch(Actions.updateComicDrawer(comicId))
    }
  }

  render() {
    const comics = this.props.comics
    const episodes = this.props.episodes
    const episodesArray = Object.keys(episodes.entries)
      .map(key => episodes.entries[key]).reverse()

    return (
      <ComicDrawer
        open={ this.props.open }
        comic={ comics.entries[this.props.comicId] || {} }
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

function mapStateToProps(state, ownProps) {
  const { open, comicId } = ownProps

  return {
    open,
    comicId,
    comics: state.comics,
    episodes: state.episodes,
    favorite: state.userPrefs.favorites.indexOf(comicId) !== -1,
    comicDrawer: state.comicDrawer,
  }
}

export default connect(
  mapStateToProps
)(ComicDrawerContainer)
