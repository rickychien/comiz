import expect from 'expect'
import { mount, shallow } from 'enzyme'
import React from 'react'
import { ComicDrawer } from '../../src/components/ComicDrawer'

describe('<ComicDrawer />', () => {
  let props

  beforeEach(() => {
    props = {
      open: undefined,
      width: undefined,
      isFetching: undefined,
      fetchError: undefined,
      comic: {},
      episodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
      favorite: undefined,
      onCloseClick: undefined,
      onFavoriteClick: undefined,
    }
  })

  it('should render correctly', () => {
    const wrapper = shallow(<ComicDrawer { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('AppBar').length).toBe(1)
    expect(wrapper.find('i.loading-spinner').length).toBe(1)
  })

  it('should render correctly with open', () => {
    const wrapper = mount(<ComicDrawer { ...props } />)
    wrapper.setProps({ open: true })
    expect(wrapper.find('div.overlay').length).toBe(1)
  })

  it('should render correctly with comic', () => {
    props.comic = {
      author: 'A author',
      brief: 'A brief',
      coverUrl: 'A cover url',
      mtime: 12300,
      title: 'A title',
    }
    const wrapper = shallow(<ComicDrawer { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('AppBar').length).toBe(1)
    expect(wrapper.find('div.cover img').length).toBe(1)
    expect(wrapper.find('CheckItem').length).toBe(1)
    expect(wrapper.find('div.episodes').length).toBe(1)
    expect(wrapper.find('div.episodesInner').children().length).toBe(3)
  })

  it('should render correctly with isFetching', () => {
    props.isFetching = true
    const wrapper = shallow(<ComicDrawer { ...props } />)
    expect(wrapper.find('i.loading-spinner').length).toBe(1)
  })

  it('should render correctly with no comic.mtime and fetchError', () => {
    const wrapper = shallow(<ComicDrawer { ...props } />)
    expect(wrapper.find('i.loading-spinner').length).toBe(1)
  })

  it('should render correctly with fetchError', () => {
    props.fetchError = true
    const wrapper = shallow(<ComicDrawer { ...props } />)
    expect(wrapper.find('.statusPage h2').text()).toBe('Unable to find comic')
  })
})
