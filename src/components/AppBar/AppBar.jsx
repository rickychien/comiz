import React, { PropTypes } from 'react'

import styles from './AppBar.css'

export default class AppBar extends React.Component {

  static propTypes = {
    materialIcon: PropTypes.string,
    title: PropTypes.string,
    onLogoClick: PropTypes.func,
    transparent: PropTypes.bool,
    children: PropTypes.node
  }

  render() {
    return (
      <div className={ `${styles.appBar} ${
          this.props.transparent && styles.appBarTransparent}` }>
        <div className={ styles.logo } onClick={ this.props.onLogoClick }>
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
