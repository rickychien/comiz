import React, { PropTypes } from 'react'

import styles from './CheckItem.css'

function CheckItem({
  checked,
  iconUncheck,
  iconChecked,
  title,
  subTitle,
  onClick
}) {
  return (
    <label htmlFor="checkbox" className={ styles.label }>
      <div className={ styles.checkbox }>
        <input
          id="checkbox"
          type="checkbox"
          defaultChecked={ checked }
          onClick={ onClick }
        />
        <i className={ 'material-icons ' + styles.uncheck }>{ iconUncheck }</i>
        <i className={ 'material-icons ' + styles.checked }>{ iconChecked }</i>
      </div>
      <div className={ styles.title }>{ title }</div>
      <div className={ styles.subTitle }>{ subTitle }</div>
    </label>
  )
}

CheckItem.defaultProps = {
  checked: false
}

CheckItem.propTypes = {
  checked: PropTypes.bool,
  iconUncheck: PropTypes.string.isRequired,
  iconChecked: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClick: PropTypes.func
}

export default CheckItem
