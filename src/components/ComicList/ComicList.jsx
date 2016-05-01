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
  onComicItemClick,
}) {
  return (
    <div>
      <AppBar materialIcon="fingerprint" title="Comiz">
        <SelectField />
        <SearchBar />
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
            <div className={ styles.container }>
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
}

ComicList.propTypes = {
  comics: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchError: PropTypes.object,
  onComicItemClick: PropTypes.func,
}

export default ComicList
