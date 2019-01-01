import React, { Component, Fragment } from 'react'
import SearchBar from './index'
import { shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<SearchBar />)
  expect(shallowWrapper.exists()).toEqual(true)
})

const placeholder = 'Search'
it(`contains correct placeholder to "${placeholder}"`, () => {
  const shallowWrapper = shallow(<SearchBar />)
  expect(shallowWrapper.props().placeholder).toBe(placeholder)
})
