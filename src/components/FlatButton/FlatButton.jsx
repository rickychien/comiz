import React, { PropTypes } from 'react'

import styles from './FlatButton.css'

function FlatButton({
  materialIcon,
  extraStyles,
  title,
  onClick,
  onContextMenu,
}) {
  let flatButtonStyles = styles.flatButton
  if (extraStyles) {
    flatButtonStyles = flatButtonStyles.concat(` ${extraStyles}`)
  }

  return (
    <div
      className={ flatButtonStyles }
      onClick={ onClick }
      onContextMenu={ onContextMenu }
    >
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
  onContextMenu: PropTypes.func,
}

export default FlatButton
