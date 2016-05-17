import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import AppBar from '../../src/components/AppBar'

describe('<AppBar />', () => {
  it('should render correctly without title', () => {
    const props = {
      materialIcon: 'close',
      children: 'text',
    }

    const wrapper = shallow(<AppBar {...props} />)
    expect(wrapper.find('div').length).toBe(4)
    expect(wrapper.first().props().className).toBe('appBar')
    expect(wrapper.find('h1').length).toBe(0)
    expect(wrapper.find('i.material-icons').length).toBe(1)
    expect(wrapper.find('div.children').text()).toBe(props.children)
  })

  it('should render correctly with title', () => {
    const props = {
      materialIcon: 'close',
      title: 'title',
      children: 'text',
    }

    const wrapper = shallow(<AppBar {...props} />)
    expect(wrapper.find('div').length).toBe(4)
    expect(wrapper.find('h1').text()).toBe(props.title)
    expect(wrapper.find('i.material-icons').length).toBe(1)
    expect(wrapper.find('div.children').text()).toBe(props.children)
  })

  it('should render correctly with transparent', () => {
    const props = {
      materialIcon: 'close',
      transparent: true,
      children: 'text',
    }

    const wrapper = shallow(<AppBar {...props} />)
    expect(wrapper.find('div').length).toBe(4)
    expect(wrapper.first().props().className).toBe('appBar appBarTransparent')
    expect(wrapper.find('h1').length).toBe(0)
    expect(wrapper.find('i.material-icons').length).toBe(1)
    expect(wrapper.find('div.children').text()).toBe(props.children)
  })
})
