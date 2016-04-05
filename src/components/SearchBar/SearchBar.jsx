import React, { PropTypes } from 'react'

import styles from './SearchBar.css'

export default class SearchBar extends React.Component {

  static propTypes = {
    onChange: PropTypes.func
  }

  onChange = () => {
    this.props.onChange && this.props.onChange()
  }

  render() {
    return (
      <div className={ styles.searchBar }>
        <div className={ styles.searchField }>
          <i className="material-icons">search</i>
          <input className={ styles.input } onChange={ this.onChange } />
        </div>
        <hr className={ styles.underline } />
      </div>
    )
  }

}
