import React, { PropTypes } from 'react'

import AppBar from '../AppBar'
import CheckItem from '../CheckItem'
import ComicEpisode from '../ComicEpisode'

import styles from './ComicNavigation.css'

export default class ComicNavigation extends React.Component {

  static defaultProps = {
    open: false
  }

  static propTypes = {
    open: PropTypes.bool,
    comicId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onCloseTap: PropTypes.func.isRequired,
    onFavoriteTap: PropTypes.func.isRequired,
    onEpisodeTap: PropTypes.func.isRequired
  }

  state = {
    comic: [],
    episodes: [],
    error: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.updateOverview(nextProps.comicId)
      this.updateEpisodes(nextProps.comicId)
    }
  }

  componentDidMount() {
    if (this.props.open) {
      this.updateOverview(this.props.comicId)
      this.updateEpisodes(this.props.comicId)
    }
  }

  updateOverview = (comicId) => {
    fetch(`/api/comics/${comicId}/overview`)
      .then(res => res.ok ? res.json() : Promise.reject('error'))
      .then(comic => this.setState({ comic, error: null }))
      .catch(error => this.setState({ error }))
  }

  updateEpisodes = (comicId) => {
    fetch(`/api/comics/${comicId}/episodes/list`)
      .then(res => res.ok ? res.json() : Promise.reject('error'))
      .then(episodes => this.setState({ episodes: episodes.reverse(), error: null }))
      .catch(error => this.setState({ error }))
  }

  render() {
    let { comic, episodes } = this.state

    return (
      <div className={ `${styles.comicNav} ${this.props.open && styles.open}` }>
        <AppBar
          materialIcon="close"
          onLogoTap={ this.props.onCloseTap }
        />
        {
          !this.state.error ? (
            <div>
              <div className={ styles.cover }>
                <img className={ styles.img } src={ comic.coverUrl } />
              </div>
              <div className={ styles.overview }>
                <div className={ styles.about }>
                  <CheckItem
                    iconUncheck="star_border"
                    iconChecked="star"
                    title={ comic.title }
                    subTitle={ comic.author }
                    onTap={ this.props.onFavoriteTap }
                  />
                </div>
                <hr className={ styles.hr } />
                <div className={ styles.brief }>
                  { comic.brief }
                </div>
                <hr className={ styles.hr } />
                <div className={ styles.episodes }>
                  {
                    episodes.map((episode) => (
                      <ComicEpisode
                        key={ episode.id }
                        episode={ episode }
                        onEpisodeTap={ this.props.onEpisodeTap }
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          ) : (
            <div className={ styles.errorPage }>
              <div>
                <i className="material-icons">error_outline</i>
                <h2>Unable to find comic</h2>
              </div>
            </div>
          )
        }
      </div>
    )
  }

}
