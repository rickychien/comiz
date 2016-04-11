import React, { PropTypes } from 'react'

import styles from './AppBar.css'

function AppBar({
  materialIcon,
  title,
  transparent,
  shrink,
  onLogoClick,
  children
}) {
  let appBarStyles = [styles.appBar]
  transparent && appBarStyles.push(styles.appBarTransparent)
  shrink && appBarStyles.push(styles.appBarShrink)

  return (
    <div className={ appBarStyles.join(' ') }>
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
  shrink: false
}

AppBar.propTypes = {
  materialIcon: PropTypes.string,
  title: PropTypes.string,
  transparent: PropTypes.bool,
  shrink: PropTypes.bool,
  onLogoClick: PropTypes.func,
  children: PropTypes.node
}

export default AppBar
