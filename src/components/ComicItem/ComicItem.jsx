import React, { PropTypes } from 'react'

import styles from './ComicItem.css'

export default class ComicItem extends React.Component {

  static propTypes = {
    comic: PropTypes.object.isRequired,
    onClick: PropTypes.func
  }

  onClick = () => {
    this.props.onClick && this.props.onClick(this.props.comic)
  }

  render() {
    let { comic } = this.props

    return (
      <div
        className={ styles.comic }
        onClick={ this.onClick }>
        <img className={ styles.img } src={ comic.coverUrl } />
        <div className={ styles.title }>
          { comic.title }
        </div>
      </div>
    )
  }

}
