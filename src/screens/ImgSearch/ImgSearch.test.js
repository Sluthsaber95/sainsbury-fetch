import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import ImgSearch from './index'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImgSearch />)
  expect(shallowWrapper.exists()).toEqual(true)
})

describe('Child Components', () => {
  const childComponents = ['SearchBar', 'ImagesDisplayed']
  childComponents.map(comp => {
    it(`contains component ${comp}`, () => {
      const shallowWrapper = shallow(<ImgSearch />)
      expect(shallowWrapper.find(`${comp}`).exists()).toBe(true)
    })
  })
})
