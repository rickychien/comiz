import React, { PropTypes } from 'react'

import styles from './ComicViewer.css'

export default class ComicViewer extends React.Component {

  static propTypes = {
    comicId: PropTypes.string.isRequired,
    episodeId: PropTypes.string.isRequired,
    prevEpisodeDisabled: PropTypes.bool.isRequired,
    onPrevEpisodeTap: PropTypes.func.isRequired,
    nextEpisodeDisabled: PropTypes.bool.isRequired,
    onNextEpisodeTap: PropTypes.func.isRequired
  }

  state = {
    pages: []
  }

  componentDidMount() {
    this.updatePages()
  }

  componentDidUpdate() {
    this.updatePages()
  }

  updatePages = () => {
    fetch(`/api/comics/${this.props.comicId}/episodes/${this.props.episodeId}/pages`)
      .then(res => res.ok ? res.json() : [])
      .then(pages => this.setState({ pages }))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div className={ styles.comicViewer }>
      {
        this.state.pages.map((page) => (
          <img key= { page } className={ styles.img } src={ page } />
        ))
      }
      {
        !this.props.prevEpisodeDisabled && (
          <div
            className={ styles.prevEpisode }
            onClick={ this.props.onPrevEpisodeTap }
          >
            <i className={ 'material-icons ' + styles.chevron }>chevron_left</i>
          </div>
        )
      }
      {
        !this.props.nextEpisodeDisabled && (
          <div
            className={ styles.nextEpisode }
            onClick={ this.props.onNextEpisodeTap }
          >
            <i className={ 'material-icons ' + styles.chevron }>chevron_right</i>
          </div>
        )
      }
      </div>
    )
  }

}
