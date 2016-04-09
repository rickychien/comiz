import React, { PropTypes } from 'react'

import AppBar from '../AppBar'
import CheckItem from '../CheckItem'
import ComicEpisodeContainer from '../../containers/ComicEpisodeContainer'

import styles from './ComicNavigation.css'

export default class ComicNavigation extends React.Component {

  static defaultProps = {
    open: false,
    comic: {},
    episodes: [],
    isFetching: false,
    fetchError: null
  }

  static propTypes = {
    open: PropTypes.bool,
    comic: PropTypes.object.isRequired,
    episodes: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    favorite: PropTypes.bool,
    fetchError: PropTypes.object,
    onCloseClick: PropTypes.func,
    onFavoriteClick: PropTypes.func
  }

  render() {
    let { open, comic, episodes, isFetching, fetchError } = this.props

    return (
      <div className={ `${styles.comicNav} ${open && styles.open}` }>
        <AppBar
          materialIcon="close"
          onLogoTap={ this.props.onCloseClick }
        />
        {
          (!isFetching && !fetchError) ? (
            <div>
              <div className={ styles.cover }>
                <img className={ styles.img } src={ comic.coverUrl } />
              </div>
              <div className={ styles.overview }>
                <div className={ styles.about }>
                  <CheckItem
                    checked={ this.props.favorite }
                    iconUncheck="star_border"
                    iconChecked="star"
                    title={ comic.title }
                    subTitle={ comic.author }
                    onClick={ this.props.onFavoriteClick }
                  />
                </div>
                <hr className={ styles.hr } />
                <div className={ styles.brief }>
                  { comic.brief }
                </div>
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

}
