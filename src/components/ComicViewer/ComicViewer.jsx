import React, { PropTypes } from 'react'

import styles from './ComicViewer.css'

export default class ComicViewer extends React.Component {

  static defaultProps = {
    pages: []
  }

  static propTypes = {
    pages: PropTypes.array,
    prevEpisodeDisabled: PropTypes.bool,
    onPrevEpisodeClick: PropTypes.func,
    nextEpisodeDisabled: PropTypes.bool,
    onNextEpisodeClick: PropTypes.func
  }

  render() {
    return (
      <div className={ styles.comicViewer }>
      {
        this.props.pages.map((page) => (
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
