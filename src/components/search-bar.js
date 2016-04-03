import React from 'react'

import styles from './search-bar.css'

export default class SearchBar extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func
  }

  render() {
    return (
      <div className={styles.searchBar}>
        <div className={styles.searchField}>
          <i className="material-icons">search</i>
          <input
            className={styles.input}
            onChange={this.props.onChange}>
          </input>
        </div>
        <hr className={styles.underline}/>
      </div>
    )
  }
}
