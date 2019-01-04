// @flow
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import axios from 'axios'

import ScreenAssetMain from './screens/AssetMain'
import ScreenImgSearch from './screens/ImgSearch'

interface AudioDataSerialized {
  description: string;
  location: string;
  media_type: string;
  nasa_id: string;
  photographer: string;
}

interface AudioData {
  data: Array<AudioDataSerialized>;
}

interface ThumbImgData {
  links: Array<{ href: string }>;
  data: Array<{ nasa_id: string, title: string }>;
}

interface ThumbImgSerialized {
  alt: string;
  key: string;
  src: string;
}

const emptyImgList: Array<ThumbImgData> = [
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

const emptyAudioList: Array<AudioDataSerialized> = [
  {
    data: [
      {
        photographer: '',
        location: '',
        media_type: '',
        nasa_id: '',
        description: '',
      },
    ],
  },
]
type State = {
  imgThumbData: Array<ThumbImgSerialized>,
  audioData: Arrau<AudioData>,
}

class App extends Component<{}, State> {
  collectRESTData: (data: Array<ThumbImgData>) => void
  serializeData: (itemList: Array<ThumbImgData>) => Array<ThumbImgSerialized>
  getSearchResults: (media_type: 'image' | 'audio', value: string) => void
  constructor() {
    super()
    this.collectRESTData = this.collectRESTData.bind(this)
    this.currentMediaType = this.currentMediaType.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
    this.serializeAudio = this.serializeAudio.bind(this)
    this.serializeData = this.serializeData.bind(this)
    this.serializeImg = this.serializeImg.bind(this)
  }
  state = {
    assetType: 'image',
    audioData: [
      {
        description: ' ',
        location: ' ',
        media_type: ' ',
        nasa_id: ' ',
        photographer: ' ',
      },
    ],
    media_type: 'image',
    imgThumbData: [{ src: ' ', key: ' ', alt: ' ' }],
  }
  collectRESTData(data: Array<ThumbImgData>, media_type: string) {
    let itemList
    switch (media_type) {
      case 'audio':
        itemList = data ? data : emptyAudioList
        break
      case 'image':
        itemList = data ? data : emptyImgList
        break
      default:
        break
    }
    const itemsSanitized = this.serializeData(itemList, media_type)
    switch (media_type) {
      case 'audio':
        this.setState(() => {
          return { audioData: itemsSanitized }
        })
        break
      case 'image':
        this.setState(() => {
          return { imgThumbData: itemsSanitized }
        })
        break
      default:
        break
    }
  }
  currentMediaType(media_type) {
    this.setState({ media_type })
  }
  getSearchResults(media_type: 'image' | 'audio', value: string): void {
    const queryPassed = value.length > 2 ? value : ''
    this.currentMediaType(media_type)
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
          this.collectRESTData(
            responseItemList.filter((_, i) => i < 20),
            media_type
          )
        }
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
  serializeData(
    itemList: Array<ThumbImgData>,
    media_type: string
  ): Array<ThumbImgSerialized> {
    switch (media_type) {
      case 'image':
        return this.serializeImg(itemList)
      case 'audio':
        return this.serializeAudio(itemList)
      default:
        return this.serializeImg(itemList)
    }
  }
  serializeImg(itemList: Array<ThumbImgData>): Array<ThumbImgSerialized> {
    return (
      itemList &&
      itemList.map(items => {
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
    )
  }
  serializeAudio(itemList: Array<AudioData>): Array<AudioDataSerialized> {
    return (
      itemList &&
      itemList.map(items => {
        let data: Array<AudioDataSerialized> = items.data
        return data[0]
      })
    )
  }
  componentDidMount() {
    this.getSearchResults('image', '')
  }
  render() {
    return (
      <Router>
        <section>
          <CssBaseline />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/search" />} />
            <Route
              path="/search"
              render={props => (
                <ScreenImgSearch
                  dataImg={this.state.imgThumbData}
                  dataAudio={this.state.audioData}
                  getSearchResults={this.getSearchResults}
                  {...props}
                />
              )}
            />
            <Route
              path="/asset/:nasa_id"
              render={props => (
                <ScreenAssetMain
                  {...props}
                  media_type={this.state.media_type}
                />
              )}
            />
          </Switch>
        </section>
      </Router>
    )
  }
}

export default App
