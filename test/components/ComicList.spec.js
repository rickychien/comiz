import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { ComicList } from '../../src/components/ComicList'

describe('<ComicList />', () => {
  let props

  beforeEach(() => {
    props = {
      comics: undefined,
      isFetching: undefined,
      fetchError: undefined,
      onComicItemClick: undefined,
    }
  })

  afterEach(() => {
    expect.restoreSpies()
  })

  it('should render correctly', () => {
    const wrapper = shallow(<ComicList { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('AppBar').length).toBe(1)
    expect(wrapper.find('ComicItem').length).toBe(0)
  })

  it('should render correctly with comics', () => {
    props.comics = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const wrapper = shallow(<ComicList { ...props } />)
    expect(wrapper.find('div.comicList').length).toBe(1)
    expect(wrapper.find('ComicItem').length).toBe(props.comics.length)
  })

  it('should render correctly with isFetching', () => {
    props.isFetching = true
    const wrapper = shallow(<ComicList { ...props } />)
    expect(wrapper.find('i.loading-spinner').length).toBe(1)
  })

  it('should render correctly with isFetching and many comics', () => {
    props.fetchError = true
    props.comics = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const wrapper = shallow(<ComicList { ...props } />)
    expect(wrapper.find('div.comicList').length).toBe(1)
    expect(wrapper.find('ComicItem').length).toBe(props.comics.length)
  })

  it('should render correctly with fetchError', () => {
    props.fetchError = true
    const wrapper = shallow(<ComicList { ...props } />)
    expect(wrapper.find('.statusPage h2').text()).toBe('Unable to find comics')
  })

  it('should render correctly with fetchError and comics', () => {
    props.fetchError = true
    props.comics = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const wrapper = shallow(<ComicList { ...props } />)
    expect(wrapper.find('div.comicList').length).toBe(1)
    expect(wrapper.find('ComicItem').length).toBe(props.comics.length)
  })
})
