import React, { PropTypes } from 'react'

import styles from './CheckItem.css'

export default class CheckItem extends React.Component {

  static defaultProps = {
    checked: false
  }

  static propTypes = {
    checked: PropTypes.bool,
    iconUncheck: PropTypes.string.isRequired,
    iconChecked: PropTypes.string.isRequired,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    onTap: PropTypes.func
  }

  onClick = (event) => {
    this.props.onTap && this.props.onTap()
  }

  render() {
    let { checked, iconUncheck, iconChecked, title, subTitle  } = this.props

    return (
      <label htmlFor="checkbox" className={ styles.label }>
        <div className={ styles.checkbox }>
          <input
            id="checkbox"
            type="checkbox"
            defaultChecked={ checked }
            onClick={ this.onClick }>
          </input>
          <i className={ 'material-icons ' + styles.uncheck }>
            { iconUncheck }
          </i>
          <i className={ 'material-icons ' + styles.checked }>
            { iconChecked }
          </i>
        </div>
        <div className={ styles.title }>{ title }</div>
        <div className={ styles.subTitle }>{ subTitle }</div>
      </label>
    )
  }

}
