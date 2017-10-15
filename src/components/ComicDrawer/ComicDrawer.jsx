import PropTypes from 'prop-types'
import React from 'react'
import Swipeable from 'react-swipeable'

import AppBar from '../AppBar'
import CheckItem from '../CheckItem'
import ComicEpisodeContainer from '../ComicEpisode'

import styles from './ComicDrawer.css'

class ComicDrawer extends React.Component {
  static defaultProps = {
    open: false,
    width: 300,
    isFetching: false,
    fetchError: false,
    comic: {},
    episodes: [],
    favorite: false,
    onCloseClick: null,
    onFavoriteClick: null,
  }

  static propTypes = {
    open: PropTypes.bool,
    width: PropTypes.number,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    comic: PropTypes.object,
    episodes: PropTypes.array,
    favorite: PropTypes.bool,
    onCloseClick: PropTypes.func,
    onFavoriteClick: PropTypes.func,
  }

  state = {
    open: false,
    xDelta: 0,
    lockX: false,
    lockY: false,
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({
        open: nextProps.open,
        xDelta: 0,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp)
  }

  onSwiping = (evt, xDelta, yDelta) => {
    const { lockX, lockY } = this.state
    const dXAbs = Math.abs(xDelta)
    const dYAbs = Math.abs(yDelta)
    const threshold = 10
    evt.stopPropagation()

    if ((lockX && !lockY) ||
        (!lockX && !lockY && dXAbs > threshold && dYAbs <= threshold)) {
      this.setState({
        xDelta,
        lockX: true,
        lockY: false,
      })
    }

    if ((!lockX && lockY) ||
        (!lockX && !lockY && dXAbs <= threshold && dYAbs > threshold)) {
      this.setState({
        xDelta: 0,
        lockX: false,
        lockY: true,
      })
    } else if (evt.cancelable) {
      evt.preventDefault()
    }
  }

  onSwiped = (evt, xDelta) => {
    if (xDelta < -(this.props.width / 2) && this.state.lockX) {
      this.handleClose()
    } else {
      this.setState({
        xDelta: 0,
        lockX: false,
        lockY: false,
      })
    }
  }

  onKeyUp = (evt) => {
    if (evt.code === 'Escape' || evt.keyCode === 27) {
      this.handleClose()
    }
  }

  getStyles = () => {
    if (!this.props.open) {
      return {}
    }

    let x = -this.props.width - this.state.xDelta
    x = x < -this.props.width ? -this.props.width : x
    return {
      transform: `translate3d(${x}px, 0, 0)`,
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
      lockX: false,
      lockY: false,
    })

    if (this.props.onCloseClick) {
      this.props.onCloseClick()
    }
  }

  render() {
    const {
      isFetching,
      fetchError,
      comic,
      episodes,
      favorite,
      onFavoriteClick,
    } = this.props

    let comicDrawerStyles = styles.comicDrawer
    let overlayStyles = null
    if (this.state.open) {
      comicDrawerStyles = comicDrawerStyles.concat(` ${styles.open}`)
      overlayStyles = styles.overlay
    }

    return (
      <div>
        <div
          className={ overlayStyles }
          role="button"
          tabIndex="0"
          onClick={ this.handleClose }
          onKeyPress={ this.handleClose }
        />
        <Swipeable
          className={ comicDrawerStyles }
          style={ this.getStyles() }
          onSwiping={ this.onSwiping }
          onSwiped={ this.onSwiped }
        >
          <AppBar materialIcon="close" onLogoClick={ this.handleClose } />
          {
            (() => {
              if (isFetching || (!comic.mtime && !fetchError)) {
                return (
                  <div className={ styles.statusPage }>
                    <i className="loading-spinner" />
                  </div>
                )
              } else if (fetchError) {
                return (
                  <div className={ styles.statusPage }>
                    <div>
                      <i className="material-icons">
                        sentiment_very_dissatisfied
                      </i>
                      <h2>Unable to find comic</h2>
                    </div>
                  </div>
                )
              }

              return (
                <div>
                  <div className={ styles.cover }>
                    <img
                      className={ styles.img }
                      src={ comic.coverUrl }
                      alt="cover"
                    />
                  </div>
                  <CheckItem
                    checked={ favorite }
                    title={ comic.title }
                    subTitle={ comic.author }
                    subTitle2={ new Date(comic.mtime)
                      .toLocaleDateString('zh-TW', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    }
                    onClick={ onFavoriteClick }
                  />
                  <hr className={ styles.hr } />
                  <div className={ styles.brief }>{ comic.brief }</div>
                  <hr className={ styles.hr } />
                  <div className={ styles.episodes }>
                    <div className={ styles.episodesInner }>
                      {
                        episodes.map(episode => (
                          <ComicEpisodeContainer
                            key={ episode.id }
                            comic={ comic }
                            episode={ episode }
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              )
            })()
          }
        </Swipeable>
      </div>
    )
  }
}

export default ComicDrawer
