import React, { PropTypes } from 'react'

import styles from './ComicViewer.css'

function ComicViewer({
  pages,
  prevEpisodeDisabled,
  nextEpisodeDisabled,
  onPrevEpisodeClick,
  onNextEpisodeClick
}) {
  return (
    <div className={ styles.comicViewer }>
    {
      pages.map((page, i) => (
        <img key={ i } className={ styles.img } src={ page } />
      ))
    }
    {
      !prevEpisodeDisabled && (
        <div className={ styles.prevEpisode } onClick={ onPrevEpisodeClick }>
          <i className={ `material-icons ${styles.chevron}` }>chevron_left</i>
        </div>
      )
    }
    {
      !nextEpisodeDisabled && (
        <div className={ styles.nextEpisode } onClick={ onNextEpisodeClick }>
          <i className={ `material-icons ${styles.chevron}` }>chevron_right</i>
        </div>
      )
    }
    </div>
  )
}

ComicViewer.defaultProps = {
  pages: [],
  prevEpisodeDisabled: true,
  nextEpisodeDisabled: true
}

ComicViewer.propTypes = {
  pages: PropTypes.array,
  prevEpisodeDisabled: PropTypes.bool,
  nextEpisodeDisabled: PropTypes.bool,
  onPrevEpisodeClick: PropTypes.func,
  onNextEpisodeClick: PropTypes.func
}

export default ComicViewer
