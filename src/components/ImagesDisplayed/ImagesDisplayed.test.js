import React from 'react'
import ImageDisplayed from './index'
import ImagesNoResults from './ImagesNoResults'
import { mount, shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImageDisplayed />)
  expect(shallowWrapper.exists()).toEqual(true)
})

it('render "ImagesNoResults" component when collection is empty', () => {
  const shallowWrapper = shallow(<ImageDisplayed collection={[]} />)

  expect(shallowWrapper.find(ImagesNoResults).length).toBe(1)
})
