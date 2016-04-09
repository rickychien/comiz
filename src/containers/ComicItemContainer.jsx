import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicItem from '../components/ComicItem'

import * as Actions from '../actions'

class ComicItemContainer extends React.Component {

  static propTypes = {
    comic: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  onClick = (comic) => {
    this.props.dispatch(Actions.showComicNavigation(comic.id))
  }

  render() {
    return (
      <ComicItem comic={ this.props.comic } onClick={ this.onClick } />
    )
  }

}

export default connect()(ComicItemContainer)
