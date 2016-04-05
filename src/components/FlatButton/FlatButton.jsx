import React from 'react'

import styles from './FlatButton.css'

export default class FlatButton extends React.Component {

  static propTypes = {
    materialIcon: React.PropTypes.string,
    title: React.PropTypes.string,
    onTap: React.PropTypes.func
  }

  render() {
    let materialIcon = this.props.materialIcon
    let title = this.props.title

    return (
      <div className={ styles.flatButton } onClick={ this.props.onTap }>
        {
          materialIcon &&
            <i className="material-icons">
              { materialIcon }
            </i>
        }
        {
          title &&
            <span>{ title }</span>
        }
      </div>
    )
  }

}
