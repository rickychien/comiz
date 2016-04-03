import React from 'react'

import styles from './app-bar.css'

export default class AppBar extends React.Component {

  static propTypes = {
    materialIcon: React.PropTypes.string,
    title: React.PropTypes.string,
    children: React.PropTypes.element
  }

  render() {
    return (
      <div className={ styles.appBar}>
        <div className={ styles.logo }>
          <div className={ styles.icon }>
            <i className="material-icons">{ this.props.materialIcon }</i>
          </div>
          <h1 className={ styles.title }>{ this.props.title }</h1>
        </div>
        <div className={ styles.children }>
          { this.props.children }
        </div>
      </div>
    )
  }

}
