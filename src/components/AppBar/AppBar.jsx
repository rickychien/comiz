import React, { PropTypes } from 'react'

import styles from './AppBar.css'

export default class AppBar extends React.Component {

  static propTypes = {
    materialIcon: PropTypes.string,
    title: PropTypes.string,
    onLogoTap: PropTypes.func,
    children: PropTypes.node
  }

  render() {
    return (
      <div className={ styles.appBar }>
        <div className={ styles.logo } onClick={ this.props.onLogoTap }>
          <div className={ styles.icon }>
            <i className="material-icons">
              { this.props.materialIcon }
            </i>
          </div>
          {
            this.props.title && (
              <h1 className={ styles.title }>
                { this.props.title }
              </h1>
            )
          }
        </div>
        <div className={ styles.children }>
          { this.props.children }
        </div>
      </div>
    )
  }

}
