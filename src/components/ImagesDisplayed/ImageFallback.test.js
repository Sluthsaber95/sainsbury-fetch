import React from 'react'
import ImageFallback from './ImageFallback'
import { shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImageFallback />)
  expect(shallowWrapper.exists()).toEqual(true)
})

it('renders this exact HTML element', () => {
  const shallowWrapper = shallow(<ImageFallback />)
  const html = `<img src=\"\" alt=\"Fallback Question Mark\"/>`
  expect(shallowWrapper.html()).toBe(html)
})
