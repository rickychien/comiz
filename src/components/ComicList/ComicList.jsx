import React, { PropTypes } from 'react'

import { ComicItemContainer } from '../ComicItem'

import styles from './ComicList.css'

function ComicList({
  comics,
  isFetching,
  fetchError,
  shrink,
  disablePrevPageClick,
  disableNextPageClick,
  onPrevPageClick,
  onNextPageClick
}) {
  let comicListStyles = [styles.container]
  shrink && comicListStyles.push(styles.containerShrink)

  return (
    (!isFetching && !fetchError) ? (
      <div className={ comicListStyles.join(' ') }>
        {
          !disablePrevPageClick && (
            <div className={ styles.prevPage } onClick={ onPrevPageClick }>
              <i className={ `material-icons ${styles.expand}` }>arrow_drop_up</i>
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
              <i className={ `material-icons ${styles.expand}` }>arrow_drop_down</i>
            </div>
          )
        }
      </div>
    ) : isFetching ? (
      <div className={ styles.statusPage }>
        <div>
          <i className="material-icons">access_time</i>
          <h2>Loading...</h2>
        </div>
      </div>
    ) : (
      <div className={ styles.statusPage }>
        <div>
          <i className="material-icons">sentiment_very_dissatisfied</i>
          <h2>Unable to find comics</h2>
        </div>
      </div>
    )
  )
}

ComicList.defaultProps = {
  comics: [],
  isFetching: false,
  fetchError: null,
  shrink: false,
  disablePrevPageClick: true,
  disableNextPageClick: true
}

ComicList.propTypes = {
  comics: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchError: PropTypes.object,
  shrink: PropTypes.bool,
  disablePrevPageClick: PropTypes.bool,
  disableNextPageClick: PropTypes.bool,
  onPrevPageClick: PropTypes.func,
  onNextPageClick: PropTypes.func
}

export default ComicList
