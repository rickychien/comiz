import React from 'react'

import styles from './app-bar.css'

export default class AppBar extends React.Component {

  static propTypes = {
    materialIcon: React.PropTypes.string,
    title: React.PropTypes.string,
    onLogoTap: React.PropTypes.func,
    children: React.PropTypes.node
  }

  render() {
    return (
      <div className={ styles.appBar }>
        <div className={ styles.logo } onClick={ this.props.onLogoTap }>
          <div className={ styles.icon }>
            <i className="material-icons">{ this.props.materialIcon }</i>
          </div>
          {
            !this.props.title ? 
            '' : <h1 className={ styles.title }>{ this.props.title }</h1>
          }

        </div>
        <div className={ styles.children }>
          { this.props.children }
        </div>
      </div>
    )
  }

}
