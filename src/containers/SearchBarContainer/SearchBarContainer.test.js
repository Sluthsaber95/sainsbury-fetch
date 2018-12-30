import React from 'react'
import { mount, shallow } from 'enzyme'
import SearchBarContainer from './index'
import '../../../config/enzyme-test-setup'

it('renders without crashing', () => {
  const shallowWrapper = shallow(<SearchBarContainer />)
  expect(shallowWrapper.exists()).toEqual(true)
})

describe('method handleChange', () => {
  it('updates state value is updated upon calling handleChange', () => {
    const wrapper = shallow(<SearchBarContainer />)
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'handleChange')
    const valuePassed = 'Apollo 11'
    const fakeEventObj = { target: { value: valuePassed } }
    instance.handleChange(fakeEventObj)

    expect(spy).toHaveBeenCalled()
    expect(wrapper.state().value).toBe(valuePassed)
  })
})

describe('method getSearchResults', () => {
  it('gets called by handleChange', () => {
    const wrapper = shallow(<SearchBarContainer />)
    const instance = wrapper.instance()
    const spyHandleChange = jest.spyOn(instance, 'handleChange')
    const spyGetSearchResults = jest.spyOn(instance, 'getSearchResults')
    const fakeEventObj = { target: { value: '' } }

    instance.handleChange(fakeEventObj)

    expect(spyHandleChange).toHaveBeenCalled()
    expect(spyGetSearchResults).toHaveBeenCalled()
  })
})
