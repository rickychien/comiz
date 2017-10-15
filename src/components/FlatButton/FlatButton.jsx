import PropTypes from 'prop-types'
import React from 'react'

import styles from './FlatButton.css'

class FlatButton extends React.PureComponent {

  static propTypes = {
    materialIcon: PropTypes.string,
    extraStyles: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func,
  }

  render() {
    const {
      extraStyles,
      materialIcon,
      onClick,
      onContextMenu,
      title,
    } = this.props

    let flatButtonStyles = styles.flatButton
    if (extraStyles) {
      flatButtonStyles = flatButtonStyles.concat(` ${ extraStyles }`)
    }

    return (
      <div
        className={ flatButtonStyles }
        onClick={ onClick }
        onContextMenu={ onContextMenu }
      >
        { materialIcon && <i className="material-icons">{ materialIcon }</i> }
        { title && <div>{ title }</div> }
      </div>
    )
  }
}

export default FlatButton
