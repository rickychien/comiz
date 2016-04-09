import React, { PropTypes } from 'react'

import FlatButton from '../FlatButton'

export default class ComicEpisode extends React.Component {

  static propTypes = {
    comic: PropTypes.object.isRequired,
    episode: PropTypes.object.isRequired,
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
      />
    )
  }

}
