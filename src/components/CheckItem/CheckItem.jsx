import PropTypes from 'prop-types'
import React from 'react'

import styles from './CheckItem.css'

class CheckItem extends React.PureComponent {
  static defaultProps = {
    checked: false,
    title: null,
    subTitle: null,
    subTitle2: null,
    onClick: null,
  }

  static propTypes = {
    checked: PropTypes.bool,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    subTitle2: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const {
      checked,
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
          <i className={ `material-icons ${styles.uncheck}` }>star_border</i>
          <i className={ `material-icons ${styles.checked}` }>star</i>
        </div>
        <div>{ title }</div>
        <div className={ styles.subTitle }>{ subTitle }</div>
        <div className={ styles.subTitle }>{ subTitle2 }</div>
      </label>
    )
  }
}

export default CheckItem
