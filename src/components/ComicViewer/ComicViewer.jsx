import React, { PropTypes } from 'react'

import styles from './ComicViewer.css'

function ComicViewer({
  pages,
  isFetching,
  fetchError,
  prevEpisodeDisabled,
  nextEpisodeDisabled,
  onPrevEpisodeClick,
  onNextEpisodeClick,
}) {
  return (
    <div className={ styles.comicViewer }>
      {
        (() => {
          if (isFetching) {
            return (
              <div className={ styles.statusPage }>
                <div>
                  <i className="material-icons">access_time</i>
                  <h2>Loading...</h2>
                </div>
              </div>
            )
          } else if (fetchError) {
            return (
              <div className={ styles.statusPage }>
                <div>
                  <i className="material-icons">sentiment_very_dissatisfied</i>
                  <h2>Unable to find comic</h2>
                </div>
              </div>
            )
          }

          return (
            <div>
              {
                pages.map((page, i) => (
                  <img
                    key={ i }
                    className={ styles.img }
                    src={ page }
                    alt={ `page ${i}` }
                  />
                ))
              }
              {
                !prevEpisodeDisabled && (
                  <div
                    className={ styles.prevEpisode }
                    onClick={ onPrevEpisodeClick }
                  >
                    <i className={ `material-icons ${styles.chevron}` }>
                      chevron_left
                    </i>
                  </div>
                )
              }
              {
                !nextEpisodeDisabled && (
                  <div
                    className={ styles.nextEpisode }
                    onClick={ onNextEpisodeClick }
                  >
                    <i className={ `material-icons ${styles.chevron}` }>
                      chevron_right
                    </i>
                  </div>
                )
              }
            </div>
          )
        })()
      }
    </div>
  )
}

ComicViewer.defaultProps = {
  pages: [],
  isFetching: false,
  fetchError: null,
  prevEpisodeDisabled: true,
  nextEpisodeDisabled: true,
}

ComicViewer.propTypes = {
  pages: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchError: PropTypes.object,
  prevEpisodeDisabled: PropTypes.bool,
  nextEpisodeDisabled: PropTypes.bool,
  onPrevEpisodeClick: PropTypes.func,
  onNextEpisodeClick: PropTypes.func,
}

export default ComicViewer
