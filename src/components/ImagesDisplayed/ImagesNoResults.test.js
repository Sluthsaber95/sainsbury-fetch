import React from 'react'
import ImagesNoResults from './ImagesNoResults'
import { shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImagesNoResults />)
  expect(shallowWrapper.exists()).toEqual(true)
})

it('renders the exact same HTML element', () => {
  const shallowWrapper = shallow(<ImagesNoResults />)
  const html = `<div>No Results Found</div>`
  expect(shallowWrapper.html()).toBe(html)
})
