import React, { PropTypes } from 'react'

import styles from './ComicViewer.css'

export default class ComicViewer extends React.Component {

  static propTypes = {
    comicId: PropTypes.string.isRequired,
    episodeId: PropTypes.string.isRequired,
    prevEpisodeDisabled: PropTypes.bool.isRequired,
    onPrevEpisodeClick: PropTypes.func,
    nextEpisodeDisabled: PropTypes.bool.isRequired,
    onNextEpisodeClick: PropTypes.func
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
            onClick={ this.props.onPrevEpisodeClick }
          >
            <i className={ 'material-icons ' + styles.chevron }>chevron_left</i>
          </div>
        )
      }
      {
        !this.props.nextEpisodeDisabled && (
          <div
            className={ styles.nextEpisode }
            onClick={ this.props.onNextEpisodeClick }
          >
            <i className={ 'material-icons ' + styles.chevron }>chevron_right</i>
          </div>
        )
      }
      </div>
    )
  }

}
