import React, { PropTypes } from 'react'

import AppBar from '../AppBar'
import ComicItem from '../ComicItem'
import SearchBar from '../SearchBar'
import SelectField from '../SelectField'

import styles from './ComicList.css'

function ComicList({
  comics,
  isFetching,
  fetchError,
  shrink,
  location,
  disablePrevPageClick,
  disableNextPageClick,
  onPrevPageClick,
  onNextPageClick,
  onComicItemClick,
}) {
  let comicListStyles = styles.container
  if (shrink) {
    comicListStyles = comicListStyles.concat(` ${styles.containerShrink}`)
  }

  return (
    <div>
      <AppBar materialIcon="fingerprint" title="Comiz" shrink={ shrink }>
        <SelectField hashQuery={ location.query } />
        <SearchBar hashQuery={ location.query } />
      </AppBar>
      {
        (() => {
          if (isFetching && comics.length <= 1) {
            return (
              <div className={ styles.statusPage }>
                <i className="material-spinner" />
              </div>
            )
          } else if (fetchError && comics.length === 0) {
            return (
              <div className={ styles.statusPage }>
                <div>
                  <i className="material-icons">sentiment_very_dissatisfied</i>
                  <h2>Unable to find comics</h2>
                </div>
              </div>
            )
          }

          return (
            <div className={ comicListStyles }>
              {
                !disablePrevPageClick && (
                  <div
                    className={ styles.prevPage }
                    onClick={ onPrevPageClick }
                  >
                    <i className={ `material-icons ${styles.expand}` }>
                      arrow_drop_up
                    </i>
                  </div>
                )
              }
              <div className={ styles.comicList }>
                <div className={ styles.comicListInner }>
                  {
                    comics.map((comic) => (
                      <ComicItem
                        key={ comic.id }
                        comic={ comic }
                        onClick={ onComicItemClick }
                      />
                    ))
                  }
                </div>
              </div>
              {
                !disableNextPageClick && (
                  <div
                    className={ styles.nextPage }
                    onClick={ onNextPageClick }
                  >
                    <i className={ `material-icons ${styles.expand}` }>
                      arrow_drop_down
                    </i>
                  </div>
                )
              }
            </div>
          )
        })()
      }
    </div>
  )
}

ComicList.defaultProps = {
  comics: [],
  isFetching: false,
  fetchError: null,
  shrink: false,
  disablePrevPageClick: true,
  disableNextPageClick: true,
}

ComicList.propTypes = {
  comics: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchError: PropTypes.object,
  shrink: PropTypes.bool,
  location: PropTypes.object,
  disablePrevPageClick: PropTypes.bool,
  disableNextPageClick: PropTypes.bool,
  onPrevPageClick: PropTypes.func,
  onNextPageClick: PropTypes.func,
  onComicItemClick: PropTypes.func,
}

export default ComicList
