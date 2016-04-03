import React from 'react'
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
import ComicList from './comic-list'
import ComicViewer from './comic-viewer'
import SearchBar from './search-bar'
import SelectField from './select-field'
import styles from './app.css'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      readingMode: true,
      currentComic: {
        id: '1',
        name: '001'
      },
      allcomics: [],
      episodes: [
        {"id":1,"title":"第01話","volume":false,"chapter":true},
        {"id":2,"title":"第02話","volume":false,"chapter":true},
        {"id":3,"title":"第03話","volume":false,"chapter":true}
      ],
      comicPictures: [],
      watchingEpisodeId: 1,
      favorites: new Set(),
      category: 'SHOW_LATEST',
      searchFilter: () => true,
      categoryFilter: () => true
    }
  }

  handleComicTap = (currentComic) => {
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
      })
      .catch((err) => {
        console.error(err)
      })

    fetch(`https://atecomic.wcpan.me/comics/${currentComic.id}/episodes`)
      .then((res) => res.ok ? res.json() : [])
      .then((episodes) => {
        this.setState({
          episodes: episodes.reverse()
        })
      })
      .catch(() => {
        this.setState({
          episodes: []
        })
      })
  }

  _handleCloseLeftNav = () => {
    this.setState({
      open: false
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

  getEpisodeByOffset = (offset) => {
    let episodes = this.state.episodes
    let index = episodes.findIndex((episode) => (
      episode.id === this.state.watchingEpisodeId
    ))
    return episodes[index + offset]
  }

  updatePrevEpisode = () => {
    let episode = this.getEpisodeByOffset(-1)
    if (episode) {
      this.setState({
        watchingEpisodeId: episode.id
      })
    }
  }

  updateNextEpisode = () => {
    let episode = this.getEpisodeByOffset(+1)
    if (episode) {
      this.setState({
        watchingEpisodeId: episode.id
      })
    }
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

  _onCategoryChanged = (event) => {
    let category = event.target.value
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

  render() {
    return (
      <div>
        <div onTouchTap={ this._closeNavigation }>

          {
            !this.state.readingMode ?
              <div>
                <AppBar
                  title="Comiz"
                  materialIcon="fingerprint">
                    <SelectField
                      value={ this.state.category }
                      menuItems={[
                        { text: "Latest", value: 'SHOW_LATEST' },
                        { text: "Favorite", value: 'SHOW_FAVORITE' }
                      ]}
                      onChange={ this._onCategoryChanged }>
                    </SelectField>
                    <SearchBar
                      onChange={ this._onSearchTextChanged }>
                    </SearchBar>
                </AppBar>
                <ComicList
                  url={ `/api/updates` }
                  comics={ this.state.allcomics }
                  onComicTap={ this.handleComicTap }>
                </ComicList>
              </div>
            :
              <div>
                <ComicViewer
                  url={ `/api/comics/${this.state.currentComic.id}/episodes/${this.state.watchingEpisodeId}/pages` }
                  prevEpisodeDisabled={ !this.getEpisodeByOffset(-1) }
                  onPrevEpisodeTap={ this.updatePrevEpisode }
                  nextEpisodeDisabled={ !this.getEpisodeByOffset(+1) }
                  onNextEpisodeTap={ this.updateNextEpisode }>
                </ComicViewer>
              </div>
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
                  this.state.episodes.map((episode) => (
                    <FlatButton
                      key={episode.id}
                      label={episode.title}
                      backgroundColor={
                        this.state.currentComic.id === this.state.watchingComicId &&
                        episode.id === this.state.watchingEpisodeId ?
                        '#bed8ff' : ''
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
