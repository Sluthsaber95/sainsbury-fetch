import React from 'react'
import { shallow } from 'enzyme'
import ImgSearch from './index'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImgSearch />)
  expect(shallowWrapper.exists()).toEqual(true)
})
describe('Child Components', () => {
  const childComponents = ['SearchBarContainer']
  childComponents.map(comp => {
    it(`contains component ${comp}`, () => {
      const shallowWrapper = shallow(<ImgSearch />)
      expect(shallowWrapper.find('SearchBarContainer').exists()).toBe(true)
    })
  })
})
