import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
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
import ContentWeekend from 'material-ui/lib/svg-icons/content/weekend'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right'
import TurnedIn from 'material-ui/lib/svg-icons/action/turned-in'
import ActionSearch from 'material-ui/lib/svg-icons/action/search'
import ToggleStar from 'material-ui/lib/svg-icons/toggle/star'
import ToggleStarBorder from 'material-ui/lib/svg-icons/toggle/star-border'
import ListItem from 'material-ui/lib/lists/list-item'
import TextField from 'material-ui/lib/text-field'
import CheckBox from 'material-ui/lib/checkbox'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

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
      chapterId: null,
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

    fetch(`/api/comic_${currentComic.id}.json`)
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

  _downloadComicChapter = (comicId, chapterId) => {
    fetch(`/api/comic_${comicId}_${chapterId}.json`)
      .then((res) => res.ok ? res.json() : [])
      .then((comicPictures) => {
        this.setState({
          comicPictures: comicPictures,
          readingMode: true,
          open: false,
          chapterId: chapterId
        })
      })
      .catch((err) => {
        console.err(err)
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
      chapter.id === this.state.chapterId
    ))
    return chapters[index - 1]
  }

  _nextChapter = () => {
    let chapters = this.state.comicChapters
    let index = chapters.findIndex((chapter) => (
      chapter.id === this.state.chapterId
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
    let regexp = new RegExp(event.target.value) || /.+/
    this.setState({
      searchFilter: function (comic) {
        return regexp.test(comic.name)
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
    fetch(`/api/allcomics.json`)
      .then((res) => res.ok ? res.json() : [])
      .then((allcomics) => {
        this.setState({
          allcomics: allcomics
        })
      })
      .catch((err) => {
        console.err(err)
      })
  }

  render() {
    const navWidth = this.state.open ? '300px' : '0px';
    const styles = {
      appBar: {
        position: 'fixed',
        margin: '0',
        top: 0,
        maxWidth: `calc(100% - ${navWidth})`,
        background: '#063047'
      },
      navAppBar: {
        position: 'fixed',
        margin: '0',
        top: 0,
        background: '#063047'
      },
      appBarTextInput: {
        marginTop: '8px',
        color: '#EEE'
      },
      appbarButton: {
        margin: 'auto',
        color: '#EEE'
      },
      allcomics: {
        margin: '80px 0',
        width: `calc(100% - ${navWidth})`
      },
      gridList: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto'
      },
      navContent: {
        margin: '80px 3%'
      },
      comicTile: {
        width: '150px',
        cursor: 'pointer'
      },
      tileTitle: `
        linear-gradient(
          to top,
          rgba(0,0,0,0.7) 0%,
          rgba(0,0,0,0.3) 70%,
          rgba(0,0,0,0) 100%
        )`
      ,
      chapters: {
        textAlign: 'center'
      },
      reading: {
        background: '#1b1b1b',
        textAlign: 'center'
      },
      picture: {
        margin: '10px 0',
        borderRadius: '8px'
      },
      previousChapter: {
        position: 'fixed',
        left: '1%',
        top: '10%',
        height: '80%',
        backgroundColor: 'rgba(#112233, 0.24)'
      },
      nextChapter: {
        position: 'fixed',
        right: '1%',
        top: '10%',
        height: '80%',
        backgroundColor: 'rgba(#112233, 0.24)'
      },
      favoriteTile: {
        cursor: 'pointer'
      }
    }

    return (
      <div>
        <div onTouchTap={this._closeNavigation}>
          <AppBar
            title="Comiz"
            style={styles.appBar}
            titleStyle={{ width: '60%' }}
            iconElementLeft={
              <IconButton onTouchTap={this._closeReadingMode}>
                { !this.state.readingMode ? <ContentWeekend /> : <ArrowBack /> }
              </IconButton>
            }
          >
            <DropDownMenu
              value={this.state.category}
              labelStyle={{ color: 'white' }}
              onChange={this._onCategoryChanged}>
              <MenuItem value={'SHOW_LATEST'} primaryText="Latest"/>
              <MenuItem value={'SHOW_FAVORITE'} primaryText="Favorite"/>
            </DropDownMenu>
            <TextField
              ref={'searchText'}
              style={{ margin: '7px 0', width: '200px' }}
              inputStyle={{ color: '#EEE' }}
              hintStyle={{ color: '#afafaf' }}
              hintText={<ActionSearch style={{ margin: 'auto' }} color="#afafaf" />}
              onChange={this._onSearchTextChanged}
            />
          </AppBar>
           {
              !this.state.readingMode ? (
                <div style={styles.allcomics}>
                  <GridList
                    style={styles.gridList}
                    cols={0}
                    cellHeight={200}
                    padding={12}>
                    {
                      this.state.allcomics
                        .filter(this.state.categoryFilter)
                        .filter(this.state.searchFilter)
                        .map((comic) => (
                          <GridTile
                            style={styles.comicTile}
                            key={comic.id}
                            title={comic.name}
                            onClick={this._handleComicToggle.bind(this, comic)}
                            titleBackground={styles.tileTitle}>
                              <img src={this._getComicCover(comic.id)}/>
                          </GridTile>
                        ))
                    }
                  </GridList>
                </div>
              ) : (
                <div style={styles.reading}>
                  {
                    this.state.comicPictures.map((pic, idx) => (
                      <img
                        key={idx}
                        style={styles.picture}
                        src={pic.url}
                      />
                    ))
                  }
                  {
                    !this._previousChapter() ? '' :
                      <IconButton
                        style={styles.previousChapter}
                        onTouchTap={this._downloadComicChapter.bind(this,
                          this.state.currentComic.id, this._previousChapter().id)}>
                        <ChevronLeft color={'#aaaaaa'}/>
                      </IconButton>
                  }
                  {
                    !this._nextChapter() ? '' :
                    <IconButton
                      style={styles.nextChapter}
                      onTouchTap={this._downloadComicChapter.bind(this,
                        this.state.currentComic.id, this._nextChapter().id)}>
                      <ChevronRight color={'#aaaaaa'}/>
                    </IconButton>
                  }
                </div>
              )
          }
        </div>
        <LeftNav width={300} openRight={true} open={this.state.open}>
          <AppBar
            style={styles.navAppBar}
            title={'About'}
            iconElementLeft={<IconButton><TurnedIn /></IconButton>}>
          </AppBar>
          <div style={styles.navContent}>
            {
              <Card>
                <CardMedia>
                  <img src={this._getComicCover(this.state.currentComic.id)}/>
                </CardMedia>
                <ListItem
                  key={this.state.currentComic.id}
                  primaryText={this.state.currentComic.name}
                  secondaryText={'Author Name'}
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
                <Divider />
                <div style={styles.chapters}>
                {
                  this.state.comicChapters.map((chapter) => (
                    <FlatButton
                      key={chapter.id}
                      label={chapter.name}
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