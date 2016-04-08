import React, { PropTypes } from 'react'

import styles from './SearchBar.css'

export default class SearchBar extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  onChange = (event) => {
    this.props.onChange && this.props.onChange(event.target.value)
  }

  render() {
    return (
      <div className={ styles.searchBar }>
        <div className={ styles.searchField }>
          <i className="material-icons">search</i>
          <input
            className={ styles.input }
            value={ this.props.value }
            onChange={ this.onChange }
            />
        </div>
        <hr className={ styles.underline } />
      </div>
    )
  }

}
