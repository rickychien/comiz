import React from 'react'

import styles from './icon-button.css'

export default class IconButton extends React.Component {

  static propTypes = {
    materialIcon: React.PropTypes.string.isRequired,
    onTap: React.PropTypes.func
  }

  render() {
    return (
      <div className={ styles.flatButton } onClick={ this.props.onTap }>
        <i className="material-icons">
          { this.props.materialIcon }
        </i>
      </div>
    )
  }

}
