import React, { PropTypes } from 'react'

import { FlatButton } from '../FlatButton'

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
            <div className={ styles.comicViewer }>
              {
                !prevEpisodeDisabled && (
                  <div
                    className={ styles.prevEpisode }
                    onClick={ onPrevEpisodeClick }
                  >
                    <FlatButton
                      materialIcon="chevron_left"
                      extraStyles={ styles.episodeButton }
                      title="Previous Episode"
                    />
                  </div>
                )
              }
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
                !nextEpisodeDisabled && (
                  <div
                    className={ styles.nextEpisode }
                    onClick={ onNextEpisodeClick }
                  >
                    <FlatButton
                      materialIcon="chevron_right"
                      extraStyles={ styles.episodeButton }
                      title="Next Episode"
                    />
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
