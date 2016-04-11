import React, { PropTypes } from 'react'

import { ComicItemContainer } from '../ComicItem'

import styles from './ComicList.css'

function ComicList({ comics, shrink }) {
  let comicListStyles = [styles.comicList]
  shrink && comicListStyles.push(styles.comicListShrink)

  return (
    <div className={ comicListStyles.join(' ') }>
      <div className={ styles.comicListInner }>
        {
          comics.map((comic) => (
            <ComicItemContainer key={ comic.id } comic={ comic } />
          ))
        }
      </div>
    </div>
  )
}

ComicList.defaultProps = {
  comics: [],
  shrink: false
}

ComicList.propTypes = {
  comics: PropTypes.array,
  shrink: PropTypes.bool
}

export default ComicList
