import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import ImgSearch from './index'
import '../../../config/enzyme-test-setup'

const context = describe

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
describe('ImgSearch Methods', () => {
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
      const spy = jest.spyOn(ImgSearch.prototype, 'serializeData')
      const wrapper = mount(<ImgSearch />)

      wrapper.instance().serializeData(dataUnserialized)
      expect(spy).toHaveBeenCalled()
      spy.mockClear()
    })

    it('returns serialized data containing {alt, key, src}, when given "dataUnserialized"', () => {
      const spy = sinon.spy(ImgSearch.prototype, 'serializeData')
      const dataSerial = '[{"alt":"","key":"","src":""}]'
      ImgSearch.prototype.serializeData(dataUnserialized)
      expect(JSON.stringify(spy.returnValues[0])).toBe(dataSerial)
    })
  })

  context('collectRESTData', () => {
    const spy = jest.spyOn(ImgSearch.prototype, 'collectRESTData')
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

      const wrapper = mount(<ImgSearch />)
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
      const jsonStringified =
        '{"imgData":[{"alt":"","key":"","src":""}],"value":""}'
      const wrapper = mount(<ImgSearch />)

      wrapper.instance().collectRESTData(dataUnserialized)
      expect(JSON.stringify(wrapper.state())).toBe(jsonStringified)
    })
  })
})
