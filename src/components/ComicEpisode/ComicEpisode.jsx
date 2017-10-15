import PropTypes from 'prop-types'
import React from 'react'

import FlatButton from '../FlatButton'

import styles from './ComicEpisode.css'

function ComicEpisode({
  comic,
  episode,
  highlight,
  markRead,
  onEpisodeClick,
  onEpisodeRightClick,
}) {
  function onContextMenu(evt) {
    evt.preventDefault()
    if (onEpisodeRightClick) {
      onEpisodeRightClick(comic.id, episode.id, markRead)
    }
  }

  let extraStyles = highlight ? styles.highlight : ''
  extraStyles = extraStyles || (markRead ? styles.markRead : '')

  return (
    <FlatButton
      title={ episode.title }
      extraStyles={ extraStyles }
      onClick={ onEpisodeClick }
      onContextMenu={ onContextMenu }
    />
  )
}

ComicEpisode.defaultProps = {
  highlight: false,
  markRead: false,
}

ComicEpisode.propTypes = {
  comic: PropTypes.object.isRequired,
  episode: PropTypes.object.isRequired,
  highlight: PropTypes.bool,
  markRead: PropTypes.bool,
  onEpisodeClick: PropTypes.func,
  onEpisodeRightClick: PropTypes.func,
}

export default ComicEpisode
