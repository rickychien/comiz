import React from 'react'

import styles from './comic-viewer.css'

export default class ComicViewer extends React.Component {

  static propTypes = {
    url: React.PropTypes.string.isRequired,
    prevEpisodeDisabled: React.PropTypes.bool.isRequired,
    onPrevEpisodeTap: React.PropTypes.func.isRequired,
    nextEpisodeDisabled: React.PropTypes.bool.isRequired,
    onNextEpisodeTap: React.PropTypes.func.isRequired
  }

  state = {
    pages: []
  }

  componentDidMount() {
    this.updatePages()
  }

  componentDidUpdate() {
    this.updatePages()
  }

  updatePages = () => {
    fetch(this.props.url)
      .then((res) => res.ok ? res.json() : [])
      .then((pages) => {
        this.setState({
          pages
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <div className={ styles.comicViewer }>
      {
        this.state.pages.map((page) => (
          <img key= { page } className={ styles.img } src={ page }></img>
        ))
      }
      {
        this.props.prevEpisodeDisabled ? '' :
        <div
          className={ styles.prevEpisode }
          onClick={ this.props.onPrevEpisodeTap }>
          <i className={ 'material-icons ' + styles.chevron }>chevron_left</i>
        </div>
      }
      {
        this.props.nextEpisodeDisabled ? '' :
        <div
          className={ styles.nextEpisode }
          onClick={ this.props.onNextEpisodeTap }>
          <i className={ 'material-icons ' + styles.chevron }>chevron_right</i>
        </div>
      }
      </div>
    )
  }

}
