import React, { PropTypes } from 'react'

import styles from './ComicItem.css'

function ComicItem({ comic, onClick }) {
  let imageStyle = styles.img
  function onComicItemClick() {
    if (onClick) {
      onClick(comic.id)
    }
  }

  return (
    <div className={ styles.comic } onClick={ onComicItemClick }>
      <img className={ imageStyle } src={ comic.coverUrl } alt="cover" />
      <div className={ styles.title }>{ comic.title }</div>
    </div>
  )
}

ComicItem.propTypes = {
  comic: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default ComicItem
