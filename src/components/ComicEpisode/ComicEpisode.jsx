import React, { PropTypes } from 'react'

import { FlatButton } from '../FlatButton'

import styles from './ComicEpisode.css'

function ComicEpisode({ comic, episode, highlight, markRead, onEpisodeClick }) {
  function onClick() {
    onEpisodeClick && onEpisodeClick(comic.id, episode.id)
  }

  const extraStyles =
    highlight ? styles.highlight :
    markRead ? styles.markRead : null

  return (
    <FlatButton
      title={ episode.title }
      extraStyles={ extraStyles }
      onClick={ onClick }
    />
  )
}

ComicEpisode.defaultProps = {
  highlight: false
}

ComicEpisode.propTypes = {
  comic: PropTypes.object.isRequired,
  episode: PropTypes.object.isRequired,
  highlight: PropTypes.bool,
  markRead: PropTypes.bool,
  onEpisodeClick: PropTypes.func
}

export default ComicEpisode
