import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import AppBar from '../../src/components/AppBar'

describe('<AppBar />', () => {
  let props

  beforeEach(() => {
    props = {
      materialIcon: 'close',
      title: undefined,
      transparent: undefined,
      onLogoClick: undefined,
      children: 'A text',
    }
  })

  it('should render correctly', () => {
    const wrapper = shallow(<AppBar { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('h1').length).toBe(0)
    expect(wrapper.find('i.material-icons').length).toBe(1)
    expect(wrapper.find('div.children').text()).toBe(props.children)
  })

  it('should render correctly with title', () => {
    props.title = 'A title'

    const wrapper = shallow(<AppBar { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.find('h1').text()).toBe(props.title)
    expect(wrapper.find('i.material-icons').length).toBe(1)
    expect(wrapper.find('div.children').text()).toBe(props.children)
  })

  it('should render correctly with transparent', () => {
    props.transparent = true

    const wrapper = shallow(<AppBar { ...props } />)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.first().props().className).toBe('appBar appBarTransparent')
    expect(wrapper.find('h1').length).toBe(0)
    expect(wrapper.find('i.material-icons').length).toBe(1)
    expect(wrapper.find('div.children').text()).toBe(props.children)
  })
})
