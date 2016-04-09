import React, { PropTypes } from 'react'

import FlatButton from '../FlatButton'

export default class ComicEpisode extends React.Component {

  static propTypes = {
    episode: PropTypes.object.isRequired,
    onEpisodeClick: PropTypes.func
  }

  onEpisodeClick = () => {
    this.props.onEpisodeClick && this.props.onEpisodeClick(this.props.episode)
  }

  render() {

    return (
      <FlatButton
        title={ this.props.episode.title }
        onTap={ this.onEpisodeClick }
      />
    )
  }

}
