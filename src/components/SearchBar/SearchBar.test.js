import React, { Component, Fragment } from 'react'
import SearchBar from './index'
import { shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<SearchBar />)
  expect(shallowWrapper.exists()).toEqual(true)
})

it('does not pass props to input when character length is 2 or less', () => {
  const mockFn = jest.fn()
  const shallowWrapper = shallow(<SearchBar callback={mockFn} />)
  const valuePassed = 'App'

  shallowWrapper.simulate('change', { target: { value: valuePassed } })
  expect(mockFn).toHaveBeenCalled()
  expect(shallowWrapper.props().value).not.toBe(valuePassed)
})

it('passes props to input when character length is 3 or more', () => {
  const mockFn = jest.fn()
  const shallowWrapper = shallow(<SearchBar callback={mockFn} />)
  const valuePassed = 'App'

  shallowWrapper.simulate('change', { target: { value: valuePassed } })
  shallowWrapper.setProps({ value: valuePassed })
  expect(mockFn).toHaveBeenCalled()
  expect(shallowWrapper.props().value).toBe(valuePassed)
})

const placeholder = 'apollo 11, mars, ISS ...'
it(`contains correct placeholder to "${placeholder}"`, () => {
  const shallowWrapper = shallow(<SearchBar />)
  expect(shallowWrapper.props().placeholder).toBe(placeholder)
})
