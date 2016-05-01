import React, { PropTypes } from 'react'

import styles from './AppBar.css'

function AppBar({
  materialIcon,
  title,
  transparent,
  onLogoClick,
  children,
}) {
  let appBarStyles = styles.appBar
  if (transparent) {
    appBarStyles = appBarStyles.concat(` ${styles.appBarTransparent}`)
  }

  return (
    <div className={ appBarStyles }>
      <div className={ styles.logo } onClick={ onLogoClick }>
        <div className={ styles.icon }>
          <i className="material-icons">
            { materialIcon }
          </i>
        </div>
          { title && <h1 className={ styles.title }> { title }</h1> }
      </div>
      <div className={ styles.children }>{ children }</div>
    </div>
  )
}

AppBar.defaultProps = {
  transparent: false,
}

AppBar.propTypes = {
  materialIcon: PropTypes.string,
  title: PropTypes.string,
  transparent: PropTypes.bool,
  onLogoClick: PropTypes.func,
  children: PropTypes.node,
}

export default AppBar
