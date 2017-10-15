import PropTypes from 'prop-types'
import React from 'react'

import FlatButton from '../FlatButton'

import styles from './ComicEpisode.css'

class ComicEpisode extends React.PureComponent {
  static defaultProps = {
    comic: {},
    episode: {},
    highlight: false,
    markRead: false,
    onEpisodeClick: null,
    onEpisodeRightClick: null,
  }

  static propTypes = {
    comic: PropTypes.object,
    episode: PropTypes.object,
    highlight: PropTypes.bool,
    markRead: PropTypes.bool,
    onEpisodeClick: PropTypes.func,
    onEpisodeRightClick: PropTypes.func,
  }

  onContextMenu = (evt) => {
    const {
      comic, episode, markRead, onEpisodeRightClick,
    } = this.props

    evt.preventDefault()
    if (onEpisodeRightClick) {
      onEpisodeRightClick(comic.id, episode.id, markRead)
    }
  }

  render() {
    const {
      episode,
      highlight,
      markRead,
      onEpisodeClick,
    } = this.props

    let extraStyles = highlight ? styles.highlight : ''
    extraStyles = extraStyles || (markRead ? styles.markRead : '')

    return (
      <FlatButton
        title={ episode.title }
        extraStyles={ extraStyles }
        onClick={ onEpisodeClick }
        onContextMenu={ this.onContextMenu }
      />
    )
  }
}

export default ComicEpisode
