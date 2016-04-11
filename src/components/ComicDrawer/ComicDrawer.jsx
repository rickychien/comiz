import React, { PropTypes } from 'react'

import { AppBar } from '../AppBar'
import { CheckItem } from '../CheckItem'
import { ComicEpisodeContainer } from '../ComicEpisode'

import styles from './ComicDrawer.css'

function ComicDrawer({
  open,
  isFetching,
  fetchError,
  comic,
  episodes,
  favorite,
  onCloseClick,
  onFavoriteClick
}) {
  let comicDrawerStyles = [styles.comicDrawer]
  open && comicDrawerStyles.push(styles.open)

  return (
    <div className={ comicDrawerStyles.join(' ') }>
      <AppBar materialIcon="close" onLogoClick={ onCloseClick }/>
      {
        (!isFetching && !fetchError) ? (
          <div>
            <div className={ styles.cover }>
              <img className={ styles.img } src={ comic.coverUrl } />
            </div>
            <div className={ styles.overview }>
              <div className={ styles.about }>
                <CheckItem
                  checked={ favorite }
                  iconUncheck="star_border"
                  iconChecked="star"
                  title={ comic.title }
                  subTitle={ comic.author }
                  onClick={ onFavoriteClick }
                />
              </div>
              <hr className={ styles.hr } />
              <div className={ styles.brief }>{ comic.brief }</div>
              <hr className={ styles.hr } />
              <div className={ styles.episodes }>
                <div className={ styles.episodesInner }>
                  {
                    episodes.map((episode) => (
                      <ComicEpisodeContainer
                        key={ episode.id }
                        comic={ comic }
                        episode={ episode }
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ) : !fetchError ? (
          <div className={ styles.statusPage }>
            <div>
              <i className="material-icons">access_time</i>
              <h2>Loading...</h2>
            </div>
          </div>
        ) : (
          <div className={ styles.statusPage }>
            <div>
              <i className="material-icons">sentiment_very_dissatisfied</i>
              <h2>Unable to find comic</h2>
            </div>
          </div>
        )
      }
    </div>
  )
}

ComicDrawer.defaultProps = {
  open: false,
  isFetching: false,
  fetchError: null,
  comic: {}
}

ComicDrawer.propTypes = {
  open: PropTypes.bool,
  isFetching: PropTypes.bool,
  fetchError: PropTypes.object,
  comic: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired,
  favorite: PropTypes.bool,
  onCloseClick: PropTypes.func,
  onFavoriteClick: PropTypes.func
}

export default ComicDrawer
