import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { ComicViewer } from '../../src/components/ComicViewer'

describe('<ComicViewer />', () => {
  let props

  beforeEach(() => {
    props = {
      pages: undefined,
      episode: { title: 'A title' },
      isFetching: undefined,
      fetchError: undefined,
      prevEpisode: undefined,
      nextEpisode: undefined,
      onPrevEpisodeClick: undefined,
      onNextEpisodeClick: undefined,
      onBackClick: undefined,
      onComicDrawerClick: undefined,
    }
  })

  it('should render correctly', () => {
    const wrapper = shallow(<ComicViewer { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('AppBar').length).toBe(1)
    expect(wrapper.find('div.title').text()).toBe(props.episode.title)
    expect(wrapper.find('div.pages img').length).toBe(0)
    expect(wrapper.find('FlatButton').length).toBe(1)
  })

  it('should render correctly with pages', () => {
    props.pages = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const wrapper = shallow(<ComicViewer { ...props } />)
    expect(wrapper.find('div.pages img').length).toBe(props.pages.length)
  })

  it('should render correctly with isFetching', () => {
    props.isFetching = true
    const wrapper = shallow(<ComicViewer { ...props } />)
    expect(wrapper.find('i.loading-spinner').length).toBe(1)
  })

  it('should render correctly with fetchError', () => {
    props.fetchError = true
    const wrapper = shallow(<ComicViewer { ...props } />)
    expect(wrapper.find('.statusPage h2').text()).toBe('Unable to find comic')
  })

  it('should render correctly with prevEpisode and nextEpisode', () => {
    props.prevEpisode = { title: 'prev' }
    props.nextEpisode = { title: 'next' }
    const wrapper = shallow(<ComicViewer { ...props } />)
    expect(wrapper.find('div.title').length).toBe(1)
    expect(wrapper.find('FlatButton').length).toBe(5)
  })
})
