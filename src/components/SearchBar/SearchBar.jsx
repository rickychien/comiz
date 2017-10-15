import PropTypes from 'prop-types'
import React from 'react'

import styles from './SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className={ styles.searchBar }>
      <div className={ styles.searchField }>
        <i className="material-icons">search</i>
        <input
          className={ styles.input }
          value={ value }
          onChange={ onChange }
        />
      </div>
      <hr className={ styles.underline } />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default SearchBar
