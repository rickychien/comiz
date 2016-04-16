import React, { PropTypes } from 'react'

import styles from './FlatButton.css'

function FlatButton({ materialIcon, extraStyles, title, onClick }) {
  let flatButtonStyles = styles.flatButton
  if (extraStyles) {
    flatButtonStyles = flatButtonStyles.concat(` ${extraStyles}`)
  }

  return (
    <div className={ flatButtonStyles } onClick={ onClick }>
      {
        materialIcon && <i className="material-icons">{ materialIcon }</i>
      }
      {
        title && <span>{ title }</span>
      }
    </div>
  )
}

FlatButton.propTypes = {
  materialIcon: PropTypes.string,
  extraStyles: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default FlatButton
