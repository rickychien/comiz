import PropTypes from 'prop-types'
import React from 'react'

import styles from './ComicItem.css'

class ComicItem extends React.PureComponent {

  static propTypes = {
    comic: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  }

  onComicItemClick = () => {
    const { comic, onClick } = this.props
    if (onClick) {
      onClick(comic.id)
    }
  }

  render() {
    const { comic } = this.props

    return (
      <div className={ styles.comic } onClick={ this.onComicItemClick }>
        <img className={ styles.img } src={ comic.coverUrl } alt="cover" />
        <div className={ styles.title }>{ comic.title }</div>
      </div>
    )
  }
}

export default ComicItem
