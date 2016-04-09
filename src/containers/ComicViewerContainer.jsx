import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicViewer from '../components/ComicViewer'

import * as Actions from '../actions'

class ComicViewerContainer extends React.Component {

  static propTypes = {
    comicId: PropTypes.number.isRequired,
    episodeId: PropTypes.number.isRequired,
    prevEpisodeDisabled: PropTypes.bool.isRequired,
    onPrevEpisodeClick: PropTypes.func.isRequired,
    nextEpisodeDisabled: PropTypes.bool.isRequired,
    onNextEpisodeClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <ComicViewer
        comicId={ this.props.comicId }
        episodeId={ this.props.episodeId }
        prevEpisodeDisabled={ this.props.prevEpisodeDisabled }
        onPrevEpisodeClick={ this.onPrevEpisodeClick }
        nextEpisodeDisabled={ this.props.nextEpisodeDisabled }
        onNextEpisodeClick={ this.onPrevEpisodeClick }
      />
    )
  }

}

const mapStateToProps = () => {
  return {

  }
}

export default connect(
  mapStateToProps
)(ComicViewer)
