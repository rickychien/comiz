import React from 'react'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import LeftNav from 'material-ui/lib/left-nav'
import IconButton from 'material-ui/lib/icon-button'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FingerPrint from 'material-ui/lib/svg-icons/action/fingerprint'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right'
import TurnedIn from 'material-ui/lib/svg-icons/action/turned-in'
import ActionSearch from 'material-ui/lib/svg-icons/action/search'
import ToggleStar from 'material-ui/lib/svg-icons/toggle/star'
import ToggleStarBorder from 'material-ui/lib/svg-icons/toggle/star-border'
import ImportContacts from 'material-ui/lib/svg-icons/communication/import-contacts'
import ListItem from 'material-ui/lib/lists/list-item'
import TextField from 'material-ui/lib/text-field'
import CheckBox from 'material-ui/lib/checkbox'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

import AppBar from './app-bar'
import styles from './app.css'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      readingMode: false,
      currentComic: {
        id: '',
        name: ''
      },
      allcomics: [],
      comicChapters: [],
      comicPictures: [],
      watchingChapterId: null,
      favorites: new Set(),
      category: 'SHOW_LATEST',
      searchFilter: () => true,
      categoryFilter: () => true
    }
  }

  _handleComicToggle = (currentComic) => {
    this.setState({
      currentComic: currentComic,
      open: true
    })

    fetch(`https://atecomic.wcpan.me/comics/${currentComic.id}`)
      .then((res) => res.ok ? res.json() : [])
      .then((comic) => {
        this.setState({
          currentComic: Object.assign({}, currentComic, comic)
        })
        console.log(Object.assign({}, currentComic, comic))
      })
      .catch((err) => {
        console.error(err)
      })

    fetch(`https://atecomic.wcpan.me/comics/${currentComic.id}/episodes`)
      .then((res) => res.ok ? res.json() : [])
      .then((comicChapters) => {
        this.setState({
          comicChapters: comicChapters.reverse()
        })
      })
      .catch(() => {
        this.setState({
          comicChapters: []
        })
      })
  }

  _handleCloseLeftNav = () => {
    this.setState({
      open: false
    })
  }

  _downloadComicChapter = (watchingComicId, watchingChapterId) => {
    fetch(`https://atecomic.wcpan.me/comics/${watchingComicId}/episodes/${watchingChapterId}/pages`)
      .then((res) => res.ok ? res.json() : [])
      .then((comicPictures) => {
        this.setState({
          comicPictures: comicPictures,
          readingMode: true,
          open: false,
          watchingComicId,
          watchingChapterId
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  _getComicById = (id) => {
    return this.state.allcomics.find((element) => element.id === id)
  }

  _getComicCover = (id) => {
    return id ? `http://www.comicvip.com/pics/0/${id}.jpg` : ''
  }

  _openNavigation = () => {
    this.setState({
      open: true
    })
  }

  _closeNavigation = () => {
    this.setState({
      open: false
    })
  }

  _closeReadingMode = () => {
    this.setState({
      readingMode: false
    })
  }

  _previousChapter = () => {
    let chapters = this.state.comicChapters
    let index = chapters.findIndex((chapter) => (
      chapter.id === this.state.watchingChapterId
    ))
    return chapters[index - 1]
  }

  _nextChapter = () => {
    let chapters = this.state.comicChapters
    let index = chapters.findIndex((chapter) => (
      chapter.id === this.state.watchingChapterId
    ))
    return chapters[index + 1]
  }

  _toggleFavorite = (id) => {
    let favorites = this.state.favorites
    favorites.has(id) ? favorites.delete(id) : favorites.add(id)

    this.setState({
      favorites: favorites
    })
  }

  _onSearchTextChanged = (event) => {
    let regexp = new RegExp(event.target.value, 'i') || /.+/
    this.setState({
      searchFilter: function (comic) {
        return regexp.test(comic.title)
      }
    })

  }

  _onCategoryChanged = (event, index, category) => {
    let categoryFilter
    switch(category) {
      case 'SHOW_LATEST':
        categoryFilter = () => true
        break;
      case 'SHOW_FAVORITE':
        categoryFilter = (comic) => this.state.favorites.has(comic.id)
        break;
    }
    this.setState({
      category,
      categoryFilter
    })
  }

  componentDidMount = () => {
    fetch(`/api/updates`)
      .then((res) => res.ok ? res.json() : [])
      .then((allcomics) => {
        this.setState({
          allcomics: allcomics
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <div onTouchTap={this._closeNavigation}>
          <AppBar
            title="Comiz"
            logoElement={
              !this.state.readingMode ?
              <i className="material-icons">fingerprint</i> :
              <i className="material-icons">arrow back</i>
            }
          >
            {
              !this.state.readingMode ? [
                <DropDownMenu
                  value={this.state.category}
                  labelStyle={{ color: 'white' }}
                  onChange={this._onCategoryChanged}>
                    <MenuItem value={'SHOW_LATEST'} primaryText="Latest"/>
                    <MenuItem value={'SHOW_FAVORITE'} primaryText="Favorite"/>
                </DropDownMenu>,
                <TextField
                  style={{ margin: '7px 0', width: '200px' }}
                  inputStyle={{ color: '#EEE' }}
                  hintStyle={{ color: '#afafaf' }}
                  hintText={<ActionSearch style={{ margin: 'auto' }} color="#afafaf" />}
                  onChange={this._onSearchTextChanged}
                />
              ] :
                <FlatButton
                  style={{ minWidth: '50px', margin: '0' }}
                  onClick={this._handleComicToggle.bind(this, this.state.currentComic)}>
                    <ImportContacts color="white"></ImportContacts>
                </FlatButton>
            }
          </AppBar>
           {
              !this.state.readingMode ? (
                <div className={styles.allcomics}>
                  <GridList
                    className={styles.gridList}
                    cols={0}
                    cellHeight={200}
                    padding={12}>
                    {
                      this.state.allcomics
                        .filter(this.state.categoryFilter)
                        .filter(this.state.searchFilter)
                        .map((comic) => {
                          return <GridTile
                            className={styles.comicTile}
                            key={comic.id}
                            title={comic.title}
                            onClick={this._handleComicToggle.bind(this, comic)}
                            titleBackground={'linear-gradient( to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'}>
                              <img src={comic.cover_url}/>
                          </GridTile>
                        })
                    }
                  </GridList>
                </div>
              ) : (
                <div className={styles.reading}>
                  {
                    this.state.comicPictures.map((page, idx) => (
                      <img
                        key={idx}
                        className={styles.picture}
                        src={page}
                      />
                    ))
                  }
                  {
                    !this._previousChapter() ? '' :
                      <IconButton
                        className={styles.previousChapter}
                        onTouchTap={this._downloadComicChapter.bind(this,
                          this.state.currentComic.id, this._previousChapter().id)}>
                        <ChevronLeft color={'#aaaaaa'}/>
                      </IconButton>
                  }
                  {
                    !this._nextChapter() ? '' :
                    <IconButton
                      className={styles.nextChapter}
                      onTouchTap={this._downloadComicChapter.bind(this,
                        this.state.currentComic.id, this._nextChapter().id)}>
                      <ChevronRight color={'#aaaaaa'}/>
                    </IconButton>
                  }
                </div>
              )
          }
        </div>
        <LeftNav width={281} openRight={true} open={this.state.open}>
          <AppBar
            className={styles.navAppBar}
            title={'About'}
            iconElementLeft={<IconButton><TurnedIn /></IconButton>}>
          </AppBar>
          <div className={styles.navContent}>
            {
              <Card>
                <CardMedia>
                  <img src={this.state.currentComic.cover_url}/>
                </CardMedia>
                <ListItem
                  key={this.state.currentComic.id}
                  primaryText={this.state.currentComic.title}
                  secondaryText={this.state.currentComic.author}
                  disabled={true}
                  leftCheckbox={
                    <CheckBox
                      checked={this.state.favorites.has(this.state.currentComic.id)}
                      checkedIcon={<ToggleStar />}
                      unCheckedIcon={<ToggleStarBorder />}
                      onCheck={this._toggleFavorite.bind(this, this.state.currentComic.id)}
                    />
                  }
                />
                <div className={styles.brief}>
                  {this.state.currentComic.brief}
                </div>
                <Divider />
                <div className={styles.chapters}>
                {
                  this.state.comicChapters.map((chapter) => (
                    <FlatButton
                      key={chapter.id}
                      label={chapter.title}
                      backgroundColor={
                        this.state.currentComic.id === this.state.watchingComicId &&
                        chapter.id === this.state.watchingChapterId ?
                        '#bed8ff' : ''
                      }
                      onTouchTap={
                        this._downloadComicChapter.bind(this,
                          this.state.currentComic.id, chapter.id)
                      }/>
                  ))
                }
                </div>
              </Card>
            }
          </div>
        </LeftNav>
      </div>
    )
  }
}
