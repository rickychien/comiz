import PropTypes from 'prop-types'
import React from 'react'

import styles from './SelectField.css'

function SelectField({
  menuItems,
  onChange,
  seletedValue,
}) {
  return (
    <div className={ styles.selectField }>
      <div>
        <select
          className={ styles.select }
          value={ seletedValue }
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
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func,
  seletedValue: PropTypes.string.isRequired,
}

export default SelectField
