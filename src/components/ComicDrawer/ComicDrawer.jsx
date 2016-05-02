import React, { PropTypes } from 'react'
import Swipeable from 'react-swipeable'
import InlineSVG from 'svg-inline-react'

import AppBar from '../AppBar'
import CheckItem from '../CheckItem'
import ComicEpisodeContainer from '../ComicEpisode'

import styles from './ComicDrawer.css'
import spinner from '../../assets/material-spinner.svg'

class ComicDrawer extends React.Component {

  static defaultProps = {
    open: false,
    width: 300,
    isFetching: false,
    fetchError: null,
    comic: {},
  }

  static propTypes = {
    open: PropTypes.bool,
    width: PropTypes.number,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.object,
    comic: PropTypes.object.isRequired,
    episodes: PropTypes.array.isRequired,
    favorite: PropTypes.bool,
    onCloseClick: PropTypes.func,
    onFavoriteClick: PropTypes.func,
  }

  state = {
    open: false,
    xDelta: 0,
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

  onSwipingRight = (evt, xDelta) => {
    this.setState({
      xDelta,
    })
  }

  onSwipedRight = (evt, xDelta) => {
    const width = this.props.width
    if (width - Math.abs(xDelta) < (width / 2)) {
      this.handleClose()
    } else {
      this.setState({
        xDelta: 0,
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

    const x = -this.props.width + this.state.xDelta
    return {
      transform: `translate3d(${x}px, 0, 0)`,
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
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
        <div className={ overlayStyles } onClick={ this.handleClose } />
        <Swipeable
          className={ comicDrawerStyles }
          style={ this.getStyles() }
          onSwipingRight={ this.onSwipingRight }
          onSwipedRight={ this.onSwipedRight }
        >
          <AppBar materialIcon="close" onLogoClick={ this.handleClose } />
          {
            (() => {
              if (isFetching || (!comic.mtime && !fetchError)) {
                return (
                  <div className={ styles.statusPage }>
                    <InlineSVG src={ spinner } />
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
                  <div className={ styles.overview }>
                    <div className={ styles.about }>
                      <CheckItem
                        checked={ favorite }
                        iconUncheck="star_border"
                        iconChecked="star"
                        title={ comic.title }
                        subTitle={ comic.author }
                        onClick={ onFavoriteClick }
                      />
                    </div>
                    <hr className={ styles.hr } />
                    <div className={ styles.brief }>{ comic.brief }</div>
                    <hr className={ styles.hr } />
                    <div className={ styles.episodes }>
                      <div className={ styles.episodesInner }>
                        {
                          episodes.map((episode) => (
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
