import React, { PropTypes } from 'react'

import ComicItem from '../ComicItem'

import styles from './ComicList.css'

export default class ComicList extends React.Component {

  static defaultProps = {
    comics: []
  }

  static propTypes = {
    comics: PropTypes.array
  }

  render() {
    return (
      <div className={ styles.comicList }>
        <div className={ styles.comicListInner }>
          {
            this.props.comics.map(comic =>
              <ComicItem key= { comic.id } comic={ comic } />
            )
          }
        </div>
      </div>
    )
  }

}
