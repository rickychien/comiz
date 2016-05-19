import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { SelectField } from '../../src/components/SelectField'

describe('<SelectField />', () => {
  let props

  beforeEach(() => {
    props = {
      selectedValue: 'B',
      menuItems: [{
        value: 'A',
        text: 'item A',
      }, {
        value: 'B',
        text: 'item B',
      }, {
        value: 'C',
        text: 'item C',
      }],
      onChange: undefined,
    }
  })

  it('should render correctly', () => {
    const wrapper = shallow(<SelectField { ...props } />)
    expect(wrapper.is('div.selectField')).toBe(true)
    expect(wrapper.find('select').length).toBe(1)
    expect(wrapper.find('option').length).toBe(props.menuItems.length)
    expect(wrapper.find('option').at(0).prop('value')).toBe(props.menuItems[0].value)
    expect(wrapper.find('option').at(0).text()).toBe(props.menuItems[0].text)
  })
})
