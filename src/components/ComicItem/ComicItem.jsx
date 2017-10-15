import PropTypes from 'prop-types'
import React from 'react'

import styles from './ComicItem.css'

function ComicItem({ comic, onClick }) {
  function onComicItemClick() {
    if (onClick) {
      onClick(comic.id)
    }
  }

  return (
    <div className={ styles.comic } onClick={ onComicItemClick }>
      <img className={ styles.img } src={ comic.coverUrl } alt="cover" />
      <div className={ styles.title }>{ comic.title }</div>
    </div>
  )
}

ComicItem.propTypes = {
  comic: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default ComicItem
