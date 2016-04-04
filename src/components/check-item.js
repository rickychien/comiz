import React from 'react'

import styles from './check-item.css'

export default class CheckItem extends React.Component {

  static defaultProps = {
    checked: false
  }

  static propTypes = {
    checked: React.PropTypes.bool,
    iconUncheck: React.PropTypes.string,
    iconChecked: React.PropTypes.string,
    title: React.PropTypes.string,
    subTitle: React.PropTypes.string,
    onTap: React.PropTypes.func
  }

  render() {
    let materialIcon = this.props.materialIcon
    let title = this.props.title

    return (
      <label for="checkbox" className={ styles.label }>
        <div className={ styles.checkbox }>
          <input
            id="checkbox"
            type="checkbox"
            defaultChecked={ this.props.checked }
            onClick={ this.props.onTap }>
          </input>
          <i className={ 'material-icons ' + styles.uncheck }>
            { this.props.iconUncheck }
          </i>
          <i className={ 'material-icons ' + styles.checked }>
            { this.props.iconChecked }
          </i>
        </div>
        <div className={ styles.title }>{ this.props.title }</div>
        <div className={ styles.subTitle }>{ this.props.subTitle }</div>
      </label>
    )
  }

}
