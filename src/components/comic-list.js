import React from 'react'

import styles from './comic-list.css'

export default class ComicList extends React.Component {

  static propTypes = {
    comics: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequir,
        cover_url: React.PropTypes.string.isRequired
      })
    ),
    onComicTap: React.PropTypes.func
  }

  onComicTap = (comic) => {
    this.props.onComicTap && this.props.onComicTap(comic);
  }

  render() {
    return (
      <div className={ styles.comicList }>
        <div className={ styles.comicListInner }>
        {
          this.props.comics.map((comic) => (
            <div
              key={ comic.id }
              className={ styles.comic }
              onClick={ this.onComicTap.bind(this, comic) }>
              <img className={ styles.img } src={ comic.cover_url }></img>
              <div className={ styles.title }>
                { comic.title }
              </div>
            </div>
          ))
        }
        </div>
      </div>
    )
  }

}
