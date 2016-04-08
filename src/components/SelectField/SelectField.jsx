import React, { PropTypes } from 'react'

import styles from './SelectField.css'

export default class SelectField extends React.Component {

  static defaultProps = {
    menuItems: []
  }

  static propTypes = {
    selectedValue: PropTypes.string,
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string
      })
    ),
    onChange: PropTypes.func
  }

  render() {
    let { selectedValue, menuItems, onChange } = this.props

    return (
      <div className={ styles.selectField }>
        <div>
          <select
            className={ styles.select }
            value={ selectedValue }
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

}
