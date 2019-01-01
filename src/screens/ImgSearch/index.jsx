// @flow
import React, { Component } from 'react'
import axios from 'axios'

import SearchBar from '../../components/SearchBar'
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
  value: string,
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
      value: '',
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
  getSearchResults = (media_type: 'image' | 'audio') => {
    const { value } = this.state
    const queryPassed = value.length > 2 ? value : ''
    return axios
      .get(`https://images-api.nasa.gov/search?`, {
        params: {
          q: queryPassed,
          media_type,
        },
      })
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          const responseItemList = response.data.collection.items
          this.collectRESTData(responseItemList.filter((_, i) => i < 20))
        }
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value })
    this.getSearchResults('image')
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
  componentDidMount() {
    this.setState({ value: '' })
    this.getSearchResults('image')
  }
  render() {
    return (
      <section>
        <article className="search-bar-wrapper">
          <SearchBar callback={this.handleChange} />
        </article>
        <ImagesDisplayed collection={this.state.imgData} />
      </section>
    )
  }
}
