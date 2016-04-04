import React from 'react'

import AppBar from './app-bar'
import CheckItem from './check-item'
import FlatButton from './flat-button'

import styles from './comic-navigation.css'

export default class ComicNavigation extends React.Component {

  static defaultProps = {
    open: false
  }

  static propTypes = {
    open: React.PropTypes.bool,
    comicId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onCloseTap: React.PropTypes.func.isRequired,
    onFavoriteTap: React.PropTypes.func.isRequired,
    onEpisodeTap: React.PropTypes.func.isRequired
  }

  state = {
    comic: [],
    episodes: [],
    error: null
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

  render() {
    let comic = this.state.comic
    let episodes = this.state.episodes

    return (
      <div className={ styles.comicNav + (this.props.open ? ' ' + styles.open : '') }>
        <AppBar
          materialIcon="close"
          onLogoTap={ this.props.onCloseTap }>
        </AppBar>
        {
          !this.state.error ?
            <div>
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
                        key={ episode.id }
                        title={ episode.title }
                        onTap={ this.props.onEpisodeTap.bind(this, comic.id, episode.id) }>
                      </FlatButton>
                    ))
                  }
                </div>
              </div>
            </div>
          :
            <div className={ styles.errorPage }>
              <div>
                <i className="material-icons">error_outline</i>
                <h2>Unable to find comic</h2>
              </div>
            </div>
        }
      </div>
    )
  }

}
