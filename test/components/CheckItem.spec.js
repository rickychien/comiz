import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import CheckItem from '../../src/components/CheckItem'

describe('<CheckItem />', () => {
  let props

  beforeEach(() => {
    props = {
      checked: undefined,
      title: 'A title',
      subTitle: 'A subTitle',
      subTitle2: 'A subTitle2',
      onClick: undefined,
    }
  })

  it('should render correctly', () => {
    const wrapper = shallow(<CheckItem { ...props } />)
    expect(wrapper.is('label')).toBe(true)
    expect(wrapper.find('input').prop('defaultChecked')).toBe(false)
    expect(wrapper.find('i.material-icons').length).toBe(2)
    expect(wrapper.find('div.subTitle').at(0).text()).toBe(props.subTitle)
    expect(wrapper.find('div.subTitle').at(1).text()).toBe(props.subTitle2)
  })
})
