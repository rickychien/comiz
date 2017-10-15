import PropTypes from 'prop-types'
import React from 'react'

import styles from './CheckItem.css'

class CheckItem extends React.PureComponent {

  static defaultProps = {
    checked: false,
  }

  static propTypes = {
    checked: PropTypes.bool,
    iconUncheck: PropTypes.string.isRequired,
    iconChecked: PropTypes.string.isRequired,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    subTitle2: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const {
      checked,
      iconUncheck,
      iconChecked,
      title,
      subTitle,
      subTitle2,
      onClick,
    } = this.props

    return (
      <label htmlFor="checkbox" className={ styles.label }>
        <div className={ styles.checkbox }>
          <input
            id="checkbox"
            type="checkbox"
            defaultChecked={ checked }
            onClick={ onClick }
          />
          <i className={ `material-icons ${styles.uncheck}` }>{ iconUncheck }</i>
          <i className={ `material-icons ${styles.checked}` }>{ iconChecked }</i>
        </div>
        <div>{ title }</div>
        <div className={ styles.subTitle }>{ subTitle }</div>
        <div className={ styles.subTitle }>{ subTitle2 }</div>
      </label>
    )
  }

}

export default CheckItem
