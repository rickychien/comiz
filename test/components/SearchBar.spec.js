import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { SearchBar } from '../../src/components/SearchBar'

describe('<SearchBar />', () => {
  let props

  beforeEach(() => {
    props = {
      value: 'A text',
      onChange: undefined,
    }
  })

  it('should render correctly', () => {
    const wrapper = shallow(<SearchBar { ...props } />)
    expect(wrapper.is('div.searchBar')).toBe(true)
    expect(wrapper.children().find('input').length).toBe(1)
  })
})
