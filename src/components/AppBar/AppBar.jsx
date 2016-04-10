import React, { PropTypes } from 'react'

import styles from './AppBar.css'

export default class AppBar extends React.Component {

  static defaultProps = {
    transparent: false,
    shrink: false
  }

  static propTypes = {
    materialIcon: PropTypes.string,
    title: PropTypes.string,
    onLogoClick: PropTypes.func,
    transparent: PropTypes.bool,
    shrink: PropTypes.bool,
    children: PropTypes.node,
  }

  render() {
    let appBarStyles = [styles.appBar]
    this.props.transparent && appBarStyles.push(styles.appBarTransparent)
    this.props.shrink && appBarStyles.push(styles.appBarShrink)

    return (
      <div className={ appBarStyles.join(' ') }>
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
