import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import FlatButton from '../../src/components/FlatButton'

describe('<FlatButton />', () => {
  let props

  beforeEach(() => {
    props = {
      materialIcon: undefined,
      extraStyles: undefined,
      title: undefined,
      onClick: undefined,
      onContextMenu: undefined,
    }
  })

  it('should render correctly', () => {
    const wrapper = shallow(<FlatButton { ...props } />)
    expect(wrapper.is('div.flatButton')).toBe(true)
    expect(wrapper.children().find('i').length).toBe(0)
    expect(wrapper.children().find('div').length).toBe(0)
  })

  it('should render correctly with materialIcon', () => {
    props.materialIcon = 'icon'

    const wrapper = shallow(<FlatButton { ...props } />)
    expect(wrapper.children().find('i').length).toBe(1)
    expect(wrapper.children().find('i').text()).toBe(props.materialIcon)
  })

  it('should render correctly with title', () => {
    props.title = 'A title'

    const wrapper = shallow(<FlatButton { ...props } />)
    expect(wrapper.children().find('div').length).toBe(1)
    expect(wrapper.children().find('div').text()).toBe(props.title)
  })

  it('should render correctly with extraStyles', () => {
    props.extraStyles = 'A style'

    const wrapper = shallow(<FlatButton { ...props } />)
    expect(wrapper.hasClass('flatButton')).toBe(true)
    expect(wrapper.hasClass(props.extraStyles)).toBe(true)
  })
})
