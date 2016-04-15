import React, { PropTypes } from 'react'

import { ComicItemContainer } from '../ComicItem'

import styles from './ComicList.css'

function ComicList({
  comics,
  shrink,
  disablePrevPageClick,
  disableNextPageClick,
  onPrevPageClick,
  onNextPageClick
}) {
  let comicListStyles = [styles.container]
  shrink && comicListStyles.push(styles.containerShrink)

  return (
    <div className={ comicListStyles.join(' ') }>
      {
        !disablePrevPageClick && (
          <div className={ styles.prevPage } onClick={ onPrevPageClick }>
            <i className={ `material-icons ${styles.chevron}` }>chevron_top</i>
          </div>
        )
      }
      <div className={ styles.comicList }>
        <div className={ styles.comicListInner }>
          {
            comics.map((comic) => (
              <ComicItemContainer key={ comic.id } comic={ comic } />
            ))
          }
        </div>
      </div>
      {
        !disableNextPageClick && (
          <div className={ styles.nextPage } onClick={ onNextPageClick }>
            <i className={ `material-icons ${styles.chevron}` }>chevron_bottom</i>
          </div>
        )
      }
    </div>
  )
}

ComicList.defaultProps = {
  comics: [],
  shrink: false,
  disablePrevPageClick: true,
  disableNextPageClick: true
}

ComicList.propTypes = {
  comics: PropTypes.array,
  shrink: PropTypes.bool,
  disablePrevPageClick: PropTypes.bool,
  disableNextPageClick: PropTypes.bool,
  onPrevPageClick: PropTypes.func,
  onNextPageClick: PropTypes.func
}

export default ComicList
