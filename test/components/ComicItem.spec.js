import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import ComicItem from '../../src/components/ComicItem'

describe('<ComicItem />', () => {
  let props

  beforeEach(() => {
    props = {
      comic: {
        id: 1,
        title: 'A title',
        coverUrl: 'A cover url',
      },
      onClick: undefined,
    }
  })

  afterEach(() => {
    expect.restoreSpies()
  })

  it('should render correctly', () => {
    const wrapper = shallow(<ComicItem { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('img').prop('src')).toBe(props.comic.coverUrl)
    expect(wrapper.find('div.title').text()).toBe(props.comic.title)
  })

  it('should invoke onClick correctly', () => {
    props.onClick = expect.createSpy()

    const wrapper = shallow(<ComicItem { ...props } />)
    wrapper.simulate('click')
    expect(props.onClick).toHaveBeenCalledWith(props.comic.id)
  })
})
