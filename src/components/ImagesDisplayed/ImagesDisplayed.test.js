import React from 'react'
import ImageDisplayed from './index'
import ImagesNoResults from './ImagesNoResults'
import { mount, shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImageDisplayed />)
  expect(shallowWrapper.exists()).toEqual(true)
})

it('does not render "ImagesNoResults" by default', () => {
  const shallowWrapper = shallow(<ImageDisplayed />)
  const wrapper = mount(<ImageDisplayed />)

  expect(shallowWrapper.find(ImagesNoResults).length).toBe(0)
  expect(wrapper.props().collection.length).toBe(1)
})

it('render "ImagesNoResults" component when collection is empty', () => {
  const shallowWrapper = shallow(<ImageDisplayed collection={[{}]} />)

  expect(shallowWrapper.find(ImagesNoResults).length).toBe(1)
})
