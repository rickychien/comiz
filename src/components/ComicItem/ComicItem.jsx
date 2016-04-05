import React, { PropTypes } from 'react'

import styles from './ComicItem.css'

export default class ComicItem extends React.Component {

  static propTypes = {
    comic: PropTypes.object.isRequired,
    onComicTap: PropTypes.func.isRequired
  }

  onClick = (event) => {
    event.stopPropagation()
    this.props.onComicTap(this.props.comic)
  }

  render() {
    let comic = this.props.comic

    return (
      <div
        className={ styles.comic }
        onClick={ this.onClick }>
        <img className={ styles.img } src={ comic.coverUrl }></img>
        <div className={ styles.title }>
          { comic.title }
        </div>
      </div>
    )
  }

}
