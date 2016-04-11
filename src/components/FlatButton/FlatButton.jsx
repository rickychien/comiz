import React, { PropTypes } from 'react'

import styles from './FlatButton.css'

function FlatButton({ materialIcon, extraStyles, title, onClick }) {
  let flatButtonStyles = [styles.flatButton]
  extraStyles && flatButtonStyles.push(extraStyles)

  return (
    <div className={ flatButtonStyles.join(' ') } onClick={ onClick }>
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
  onClick: PropTypes.func
}

export default FlatButton
