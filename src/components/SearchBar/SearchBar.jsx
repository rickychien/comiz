import PropTypes from 'prop-types'
import React from 'react'

import styles from './SearchBar.css'

class SearchBar extends React.PureComponent {

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  render() {
    const { onChange, value } = this.props

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

}

export default SearchBar
