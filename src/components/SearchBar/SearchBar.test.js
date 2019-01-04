import React, { Component, Fragment } from 'react'
import SearchBar from './index'
import { mount, shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<SearchBar />)
  expect(shallowWrapper.exists()).toEqual(true)
})

const placeholder = 'Search'
it(`contains correct placeholder to "${placeholder}"`, () => {
  const wrapper = mount(<SearchBar />)
  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.find('input').props().placeholder).toBe(placeholder)
})
