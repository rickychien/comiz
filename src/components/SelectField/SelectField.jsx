import React, { PropTypes } from 'react'

import styles from './SelectField.css'

export default class SelectField extends React.Component {

  static defaultProps = {
    menuItems: []
  }

  static propTypes = {
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string
      })
    ),
    onChange: PropTypes.func
  }

  render() {
    return (
      <div className={ styles.selectField }>
        <div>
          <select className={ styles.select } onChange={ this.props.onChange }>
            {
              this.props.menuItems.map((item) => (
                <option key={ item.value } value={ item.value }>
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
