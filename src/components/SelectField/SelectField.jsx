import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'

import styles from './SelectField.css'

function SelectField({
  match,
  menuItems,
  onChange,
}) {
  return (
    <div className={ styles.selectField }>
      <div>
        <select
          className={ styles.select }
          value={ match.params.category }
          onChange={ onChange }
        >
          {
            menuItems.map((item) => (
              <option key={ item.value } value={ item.value } >
                { item.text }
              </option>
            ))
          }
        </select>
      </div>
      <hr className={ styles.underline } />
    </div>
  )
}

SelectField.defaultProps = {
  menuItems: [],
}

SelectField.propTypes = {
  match: PropTypes.object.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func,
}

export default withRouter(SelectField)
