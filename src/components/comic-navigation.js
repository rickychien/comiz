import React from 'react'

import AppBar from './app-bar'

import styles from './comic-navigation.css'

export default class ComicNavigation extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    onCloseTap: React.PropTypes.func.isRequired,
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
    return (
      <div className={ styles.comicNav + ' ' + styles.open }>
        <AppBar
          materialIcon="close"
          onLogoTap={ this.onCloseTap }>
        </AppBar>
        <div className={ styles.overview }>
          <div className={ styles.img }>
            <img src={ this.state.comic.coverUrl }></img>
          </div>
          <div className={ styles.about }>
            <div className={ styles.brief }>

            </div>
          </div>
          <hr/>
          <div className={ styles.episodes }>

          </div>
        </div>
      </div>
    )
  }

}
