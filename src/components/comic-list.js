import React from 'react'

import styles from './comic-list.css'

export default class ComicList extends React.Component {

  static propTypes = {
    url: React.PropTypes.string,
    onComicTap: React.PropTypes.func
  }

  state = {
    comics: []
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.ok ? res.json() : [])
      .then(comics => this.setState({ comics }))
      .catch(err => console.error(err))
  }

  onComicTap = (comic) => {
    this.props.onComicTap && this.props.onComicTap(comic);
  }

  render() {
    return (
      <div className={ styles.comicList }>
        <div className={ styles.comicListInner }>
        {
          this.state.comics.map((comic) => (
            <div
              key={ comic.id }
              className={ styles.comic }
              onClick={ this.onComicTap.bind(this, comic.id) }>
              <img className={ styles.img } src={ comic.coverUrl }></img>
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
