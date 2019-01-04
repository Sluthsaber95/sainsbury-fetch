import React, { Component, Fragment } from 'react'
import ImageWrapper from './ImageWrapper'
import { shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImageWrapper />)
  expect(shallowWrapper.exists()).toEqual(true)
})
