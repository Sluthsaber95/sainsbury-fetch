import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import App from './App'
import '../config/enzyme-test-setup'

const context = describe

it('renders without crashing', () => {
  const wrapper = mount(<App />)
  expect(wrapper.exists()).toEqual(true)
  wrapper.unmount()
})

describe('App Methods', () => {
  context('serializeData', () => {
    const dataUnserialized = [
      {
        links: [
          {
            href: '',
          },
        ],
        data: [
          {
            nasa_id: '',
            title: '',
          },
        ],
      },
    ]

    it('exists', () => {
      const spy = jest.spyOn(App.prototype, 'serializeData')
      const wrapper = mount(<App />)

      wrapper.instance().serializeData(dataUnserialized)
      expect(spy).toHaveBeenCalled()
      spy.mockClear()
    })

    it('returns serialized data containing {alt, key, src}, when given "dataUnserialized"', () => {
      const spy = sinon.spy(App.prototype, 'serializeData')
      const dataSerial = '[{"alt":"","key":"","src":""}]'
      App.prototype.serializeData(dataUnserialized)
      expect(JSON.stringify(spy.returnValues[0])).toBe(dataSerial)
    })
  })

  context('collectRESTData', () => {
    const spy = jest.spyOn(App.prototype, 'collectRESTData')
    afterEach(() => {
      spy.mockClear()
    })

    it('exists', () => {
      const dataUnserialized = [
        {
          links: [
            {
              href: '',
            },
          ],
          data: [
            {
              nasa_id: '',
              title: '',
            },
          ],
        },
      ]

      const wrapper = mount(<App />)
      wrapper.instance().collectRESTData(dataUnserialized)
      expect(spy).toHaveBeenCalled()
    })

    it('setsState to serialized data containing {alt, key, src}, when given "dataUnserialized"', () => {
      const dataUnserialized = [
        {
          links: [
            {
              href: '',
            },
          ],
          data: [
            {
              nasa_id: '',
              title: '',
            },
          ],
        },
      ]
      const jsonStringified = '{"imgThumbData":[{"alt":"","key":"","src":""}]}'
      const wrapper = mount(<App />)

      wrapper.instance().collectRESTData(dataUnserialized)
      expect(JSON.stringify(wrapper.state())).toBe(jsonStringified)
    })
  })
})
