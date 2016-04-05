import React from 'react'

import AppBar from '../AppBar'
import ComicList from '../ComicList'
import ComicViewer from '../ComicViewer'
import FlatButton from '../FlatButton'
import ComicNavigation from '../ComicNavigation'
import SearchBar from '../SearchBar'
import SelectField from '../SelectField'

import styles from './App.css'

export default class App extends React.Component {

  state = {
    comicNavigationOpened: false,
    comicViewerOpened: false,
    comicId: null,
    episodeId: null,
    favorites: new Set(),
    category: 'SHOW_LATEST',
    searchFilter: () => true,
    categoryFilter: () => true
  }

  handleComicNavigationOpen = (comic) => {
    this.setState({
      comicNavigationOpened: true,
      comicId: comic ? comic.id : this.state.comicId
    })
  }

  handleComicNavigationClose = () => {
    this.setState({
      comicNavigationOpened: false
    })
  }

  handleComicViewerOpen = (episode) => {
    this.setState({
      comicViewerOpened: true,
      episodeId: episode ? episode.id : this.state.episodeId
    })
  }

  handleComicViewerClose = (comicId) => {
    this.setState({
      comicViewerOpened: false
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
        episodeId: episode.id
      })
    }
  }

  updateNextEpisode = () => {
    let episode = this.getEpisodeByOffset(+1)
    if (episode) {
      this.setState({
        episodeId: episode.id
      })
    }
  }

  toggleFavorite = () => {
    let comicId = this.state.comidId
    let favorites = this.state.favorites
    favorites.has(comicId) ? favorites.delete(comicId) : favorites.add(comicId)

    this.setState({
      favorites: favorites
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

  onSearchTextChanged = (event) => {
    let regexp = new RegExp(event.target.value, 'i')
    this.setState({
      searchFilter: function (comic) {
        return regexp.test(comic.title)
      }
    })
  }

  render() {
    return (
      <div>
        {
          !this.state.comicViewerOpened?
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
                onComicTap={ this.handleComicNavigationOpen }>
              </ComicList>
            </div>
          :
            <div>
              <AppBar
                materialIcon="arrow_back"
                onLogoClick={ this.handleComicNavigationClose }>
                <FlatButton
                  materialIcon="book"
                  onTap={ this.handleComicNavigationOpen }>
                </FlatButton>
              </AppBar>
              <ComicViewer
                comicId={ this.state.comicId }
                episodeId={ this.state.episodeId }
                prevEpisodeDisabled={ !this.getEpisodeByOffset(-1) }
                onPrevEpisodeTap={ this.updatePrevEpisode }
                nextEpisodeDisabled={ !this.getEpisodeByOffset(+1) }
                onNextEpisodeTap={ this.updateNextEpisode }>
              </ComicViewer>
            </div>
        }
        <ComicNavigation
          open={ this.state.comicNavigationOpened }
          comicId={ this.state.comicId }
          onCloseTap={ this.handleComicNavigationClose }
          onFavoriteTap={ this.toggleFavorite }
          onEpisodeTap={ this.handleComicViewerOpen }>
        </ComicNavigation>
      </div>
    )
  }
}
