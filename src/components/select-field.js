import React from 'react'

import styles from './select-field.css'

export default class SelectField extends React.Component {

  static defaultProps = {
    menuItems: []
  }

  static propTypes = {
    menuItems: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        text: React.PropTypes.string,
        value: React.PropTypes.string
      })
    ),
    onChange: React.PropTypes.func
  }

  render() {
    return (
      <div className={ styles.selectField }>
        <div>
          <select className={ styles.select } onChange={ this.props.onChange }>
            {
              this.props.menuItems.map((item) => (
                <option
                  key={ item.value }
                  value={ item.value }>
                  { item.text }
                </option>
              ))
            }
          </select>
        </div>
        <hr className={ styles.underline }/>
      </div>
    )
  }

}
