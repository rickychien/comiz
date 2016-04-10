import React, { PropTypes } from 'react'

import ComicItemContainer from '../../containers/ComicItemContainer'

import styles from './ComicList.css'

export default class ComicList extends React.Component {

  static defaultProps = {
    comics: [],
    shrink: false
  }

  static propTypes = {
    comics: PropTypes.array,
    shrink: PropTypes.bool
  }

  render() {
    let comicListStyles = [styles.comicList]
    this.props.shrink && comicListStyles.push(styles.comicListShrink)

    return (
      <div className={ comicListStyles.join(' ') }>
        <div className={ styles.comicListInner }>
          {
            this.props.comics.map((comic) => (
              <ComicItemContainer key= { comic.id } comic={ comic } />
            ))
          }
        </div>
      </div>
    )
  }

}
