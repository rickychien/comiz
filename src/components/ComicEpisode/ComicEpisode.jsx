import React, { PropTypes } from 'react'

import { FlatButton } from '../FlatButton'

import styles from './ComicEpisode.css'

function ComicEpisode({ comic, episode, highlight, onEpisodeClick }) {
  function onClick() {
    onEpisodeClick && onEpisodeClick(comic.id, episode.id)
  }

  return (
    <FlatButton
      title={ episode.title }
      extraStyles={ highlight ? styles.highlight : '' }
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
  onEpisodeClick: PropTypes.func
}

export default ComicEpisode
