import React from 'react'

import AppBar from './app-bar'
import ComicList from './comic-list'
import ComicViewer from './comic-viewer'
import FlatButton from './flat-button'
import ComicNavigation from './comic-navigation'
import SearchBar from './search-bar'
import SelectField from './select-field'

import styles from './app.css'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      comicNavigationOpened: false,
      readingMode: false,
      currentComic: { id: '1' },
      allcomics: [],
      episodes: [],
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
      comicNavigationOpened: true
    })
  }

  _handleCloseLeftNav = () => {
    this.setState({
      comicNavigationOpened: false
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
      comicNavigationOpened: true
    })
  }

  closeNavigation = () => {
    this.setState({
      comicNavigationOpened: false
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

  toggleFavorite = (id) => {
    let favorites = this.state.favorites
    favorites.has(id) ? favorites.delete(id) : favorites.add(id)

    this.setState({
      favorites: favorites
    }, function() { console.log(this.state) })
  }

  onSearchTextChanged = (event) => {
    let regexp = new RegExp(event.target.value, 'i') || /.+/
    this.setState({
      searchFilter: function (comic) {
        return regexp.test(comic.title)
      }
    })
  }

  onCategoryChanged = (event) => {
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
        <div onTouchTap={ this.closeNavigation }>
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
                      onChange={ this.onCategoryChanged }>
                    </SelectField>
                    <SearchBar
                      onChange={ this.onSearchTextChanged }>
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
                <AppBar
                  materialIcon="arrow_back"
                  onLogoClick={ this.closeNavigation }>
                  <FlatButton
                    materialIcon="book"
                    onTap={ this.handleComicTap }>
                  </FlatButton>
                </AppBar>
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
        <ComicNavigation
          open={ this.state.comicNavigationOpened }
          onCloseTap={ this.closeNavigation }
          overviewUrl={ `/api/comics/${this.state.currentComic.id}/overview` }
          episodesUrl={ `/api/comics/${this.state.currentComic.id}/episodes/list` }
          onFavoriteTap={ this.toggleFavorite.bind(this, this.state.currentComic.id) }>
        </ComicNavigation>
      </div>
    )
  }
}
