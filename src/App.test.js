import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import App from './App'
import '../config/enzyme-test-setup'

it('renders without crashing', () => {
  const wrapper = mount(<App />)
  expect(wrapper.exists()).toEqual(true)
  wrapper.unmount()
})
