// @flow
import React, { Component } from 'react'

import SearchBarContainer from '../../containers/SearchBarContainer'
import ImagesDisplayed from '../../components/ImagesDisplayed'

interface ThumbImgData {
  links: Array<{ href: string }>;
  data: Array<{ nasa_id: string, title: string }>;
}

interface ThumbImgSerialized {
  alt: string;
  key: string;
  src: string;
}

type State = {
  imgData: Array<Object>,
}

const emptyCollection: Array<ThumbImgData> = [
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

export default class ImgSearch extends Component<{}, State> {
  collectRESTData: (data: Array<ThumbImgData>) => void
  serializeData: (itemList: Array<ThumbImgData>) => Array<ThumbImgSerialized>
  constructor() {
    super()
    this.state = {
      imgData: [{ key: 'KSC-99pp0498' }],
    }
    this.collectRESTData = this.collectRESTData.bind(this)
    this.serializeData = this.serializeData.bind(this)
  }
  collectRESTData(data: Array<ThumbImgData>) {
    const itemList = data ? data : emptyCollection
    const itemsSanitized = this.serializeData(itemList)
    this.setState(() => {
      return { imgData: itemsSanitized }
    })
  }
  serializeData(itemList: Array<ThumbImgData>): Array<ThumbImgSerialized> {
    return itemList.map(items => {
      let data: Array<{ nasa_id: string, title: string }> = items.data
      let links: Array<{ href: string }> = items.links
      const { nasa_id, title } = data[0]
      const { href } = links[0]
      return {
        alt: title,
        key: nasa_id,
        src: href,
      }
    })
  }
  render() {
    return (
      <section>
        <SearchBarContainer collectData={this.collectRESTData} />
        <ImagesDisplayed collection={this.state.imgData} />
      </section>
    )
  }
}
