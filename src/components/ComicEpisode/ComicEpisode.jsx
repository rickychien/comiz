import React, { PropTypes } from 'react'

import FlatButton from '../FlatButton'

import styles from './ComicEpisode.css'

export default class ComicEpisode extends React.Component {

  static defaultProps = {
    highlight: false
  }

  static propTypes = {
    comic: PropTypes.object.isRequired,
    episode: PropTypes.object.isRequired,
    highlight: PropTypes.bool,
    onEpisodeClick: PropTypes.func
  }

  onClick = () => {
    const { comic, episode, onEpisodeClick } = this.props
    onEpisodeClick && onEpisodeClick(comic, episode)
  }

  render() {

    return (
      <FlatButton
        title={ this.props.episode.title }
        onClick={ this.onClick }
        styles={ this.props.highlight && styles.highlight }
      />
    )
  }

}
