import React, { PropTypes } from 'react'

import AppBar from '../AppBar'
import FlatButton from '../FlatButton'

import styles from './ComicViewer.css'

function ComicViewer({
  pages,
  episode,
  isFetching,
  fetchError,
  prevEpisode,
  nextEpisode,
  onPrevEpisodeClick,
  onNextEpisodeClick,
  onBackClick,
  onComicDrawerClick,
}) {
  return (
    <div className={ styles.comicViewer }>
      <AppBar materialIcon="arrow_back" onLogoClick={ onBackClick } transparent>
        <FlatButton materialIcon="book" onClick={ onComicDrawerClick } />
      </AppBar>
      {
        (() => {
          if (isFetching) {
            return (
              <div className={ styles.statusPage }>
                <i className="material-spinner" />
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
                <div className={ styles.title }>
                  { episode.title }
                </div>
              }
              {
                prevEpisode && (
                  <div
                    className={ styles.prevEpisode }
                    onClick={ onPrevEpisodeClick }
                  >
                    <FlatButton
                      materialIcon="chevron_left"
                      extraStyles={ styles.episodeButton }
                      title={ prevEpisode.title }
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
                nextEpisode && (
                  <div
                    className={ styles.nextEpisode }
                    onClick={ onNextEpisodeClick }
                  >
                    <FlatButton
                      materialIcon="chevron_right"
                      extraStyles={ styles.episodeButton }
                      title={ nextEpisode.title }
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
  episode: {},
  isFetching: false,
  fetchError: null,
  prevEpisodeDisabled: true,
  nextEpisodeDisabled: true,
}

ComicViewer.propTypes = {
  pages: PropTypes.array,
  episode: PropTypes.object,
  isFetching: PropTypes.bool,
  fetchError: PropTypes.object,
  prevEpisode: PropTypes.object,
  nextEpisode: PropTypes.object,
  onPrevEpisodeClick: PropTypes.func,
  onNextEpisodeClick: PropTypes.func,
  onBackClick: PropTypes.func,
  onComicDrawerClick: PropTypes.func,
}

export default ComicViewer
