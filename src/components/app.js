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

  state = {
    comicNavigation: {
      opened: false,
      comicId: null
    },
    comicViewer: {
      opened: false,
      comicId: null,
      episodeId: null
    },
    category: 'SHOW_LATEST',
    searchFilter: () => true,
    categoryFilter: () => true
  }

  handleComicNavigationOpen = (comicId) => {
    this.setState({
      comicNavigation: {
        opened: true,
        comicId
      }
    })
  }

  handleComicNavigationClose = () => {
    this.setState({
      comicNavigation: {
        opened: false
      }
    })
  }

  handleComicViewerOpen = (comicId, episodeId) => {
    this.setState({
      comicViewer: {
        opened: true,
        comicId,
        episodeId
      }
    })
  }

  handleComicViewerClose = (comicId) => {
    this.setState({
      comicViewer: {
        opened: false
      }
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
        {
          !this.state.comicViewer.opened ?
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
                comics={ [] }
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
                  onTap={ this.handleComicNavigationOpen.bind(this, this.state.comicNavigation.comicId) }>
                </FlatButton>
              </AppBar>
              <ComicViewer
                url={ `/api/comics/${this.state.comicNavigation.comicId}/episodes/${this.state.watchingEpisodeId}/pages` }
                prevEpisodeDisabled={ !this.getEpisodeByOffset(-1) }
                onPrevEpisodeTap={ this.updatePrevEpisode }
                nextEpisodeDisabled={ !this.getEpisodeByOffset(+1) }
                onNextEpisodeTap={ this.updateNextEpisode }>
              </ComicViewer>
            </div>
        }
        <ComicNavigation
          open={ this.state.comicNavigation.opened }
          onCloseTap={ this.handleComicNavigationClose }
          comicId={ this.state.comicNavigation.comicId }
          onFavoriteTap={ this.toggleFavorite.bind(this, this.state.comicNavigation.comicId) }
          onEpisodeTap={ this.handleComicViewerOpen }>
        </ComicNavigation>
      </div>
    )
  }
}
