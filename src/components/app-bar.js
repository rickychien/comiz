import React from 'react'

import styles from './app-bar.css'

export default class AppBar extends React.Component {

  static propTypes = {
    logoElement: React.PropTypes.node,
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.node
  }

  render() {
    return (
      <div className={styles.appBar}>
        <div className={styles.logo}>
          <div className={styles.icon}>
            {this.props.logoElement}
          </div>
          <h1 className={styles.title}>{this.props.title}</h1>
        </div>
        <div className={styles.children}>
          {this.props.children}
        </div>
      </div>
    )
  }

}
