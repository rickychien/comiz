import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { ComicEpisode } from '../../src/components/ComicEpisode'
import FlatButton from '../../src/components/FlatButton'

describe('<ComicEpisode />', () => {
  let props

  beforeEach(() => {
    props = {
      comic: { id: 1 },
      episode: { id: 2, title: 'episode 3' },
      highlight: undefined,
      markRead: undefined,
      onEpisodeClick: undefined,
      onEpisodeRightClick: undefined,
    }
  })

  afterEach(() => {
    expect.restoreSpies()
  })

  it('should render correctly', () => {
    const wrapper = shallow(<ComicEpisode { ...props } />)
    expect(wrapper.is(FlatButton)).toBe(true)
    expect(wrapper.first().prop('extraStyles')).toBe('')
  })

  it('should render correctly with highlight', () => {
    props.highlight = true
    const wrapper = shallow(<ComicEpisode { ...props } />)
    expect(wrapper.first().prop('extraStyles')).toBe('highlight')
  })

  it('should render correctly with markRead', () => {
    props.markRead = true
    const wrapper = shallow(<ComicEpisode { ...props } />)
    expect(wrapper.first().prop('extraStyles')).toBe('markRead')
  })

  it('should render correctly with highlight and markRead', () => {
    props.highlight = true
    props.markRead = true
    const wrapper = shallow(<ComicEpisode { ...props } />)
    expect(wrapper.first().prop('extraStyles')).toBe('highlight')
  })

  it('should invoke onEpisodeRightClick correctly', () => {
    props.markRead = true
    props.onEpisodeRightClick = expect.createSpy()

    const wrapper = shallow(<ComicEpisode { ...props } />)
    wrapper.simulate('contextmenu', { preventDefault: () => {} })
    expect(props.onEpisodeRightClick)
      .toHaveBeenCalledWith(props.comic.id, props.episode.id, props.markRead)
  })
})
