import React from 'react'

import AppBar from './app-bar'
import CheckItem from './check-item'
import FlatButton from './flat-button'

import styles from './comic-navigation.css'

export default class ComicNavigation extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    onCloseTap: React.PropTypes.func.isRequired,
    onFavoriteTap: React.PropTypes.func.isRequired,
    overviewUrl: React.PropTypes.string.isRequired,
    episodesUrl: React.PropTypes.string.isRequired
  }

  state = {
    comic: [],
    episodes: []
  }

  onCloseTap = () => {
    this.props.onCloseTap()
  }

  updateOverview = (url) => {
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .then(comic => this.setState({ comic }))
      .catch(err => console.error(err))
  }

  updateEpisodes = (url) => {
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .then(episodes => this.setState({ episodes: episodes.reverse() }))
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.updateOverview(this.props.overviewUrl)
    this.updateEpisodes(this.props.episodesUrl)
  }

  render() {
    let comic = this.state.comic
    let episodes = this.state.episodes

    return (
      <div className={ styles.comicNav  + (this.props.open ? ' ' + styles.open : '') }>
        <AppBar
          materialIcon="close"
          onLogoTap={ this.onCloseTap }>
        </AppBar>
        <div className={ styles.cover }>
          <img className={ styles.img } src={ comic.coverUrl }></img>
        </div>
        <div className={ styles.overview }>
          <div className={ styles.about }>
            <CheckItem
              iconUncheck="star_border"
              iconChecked="star"
              title={ comic.title }
              subTitle={ comic.author }
              onTap={ this.props.onFavoriteTap }>
            </CheckItem>
          </div>
          <hr className={ styles.hr }/>
          <div className={ styles.brief }>
            { comic.brief }
          </div>
          <hr className={ styles.hr }/>
          <div className={ styles.episodes }>
            {
              episodes.map((episode) => (
                <FlatButton
                  title={ episode.title }
                  onTap={ this.handleComicTap }>
                </FlatButton>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

}
