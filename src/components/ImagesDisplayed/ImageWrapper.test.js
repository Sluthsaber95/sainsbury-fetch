import React, { Component, Fragment } from 'react'
import ImageWrapper from './ImageWrapper'
import { shallow } from 'enzyme'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<ImageWrapper />)
  expect(shallowWrapper.exists()).toEqual(true)
})

it('does not render an image if "src" link property is empty', () => {
  const shallowWrapper = shallow(<ImageWrapper />)
  expect(shallowWrapper.find('ImageFallback').exists()).toBe(true)
})

it('render an image if "src" link property is empty', () => {
  const imgData = {
    alt: 'International Space Station',
    src: 'https://images-assets.nasa.gov/image/9802667/9802667~thumb.jpg',
  }
  const html = `<img alt=\"${imgData.alt}\" src=\"${imgData.src}\"/>`
  const shallowWrapper = shallow(<ImageWrapper {...imgData} />)
  expect(shallowWrapper.find('ImageFallback').exists()).not.toBe(true)
  expect(shallowWrapper.html()).toBe(html)
})
