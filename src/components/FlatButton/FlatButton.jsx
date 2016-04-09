import React, { PropTypes } from 'react'

import styles from './FlatButton.css'

export default class FlatButton extends React.Component {

  static propTypes = {
    materialIcon: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func
  }

  onClick = () => {
    this.props.onClick && this.props.onClick()
  }

  render() {
    let { materialIcon, title } = this.props

    return (
      <div className={ styles.flatButton } onClick={ this.onClick }>
        {
          materialIcon && (
            <i className="material-icons">
              { materialIcon }
            </i>
          )
        }
        {
          title && <span>{ title }</span>
        }
      </div>
    )
  }

}
