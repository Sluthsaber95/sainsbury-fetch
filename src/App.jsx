// @flow
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import axios from 'axios'

import ScreenImgSearch from './screens/ImgSearch'

interface ThumbImgData {
  links: Array<{ href: string }>;
  data: Array<{ nasa_id: string, title: string }>;
}

interface ThumbImgSerialized {
  alt: string;
  key: string;
  src: string;
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
type State = {
  imgThumbData: Array<ThumbImgSerialized>,
}

class App extends Component<{}, State> {
  collectRESTData: (data: Array<ThumbImgData>) => void
  serializeData: (itemList: Array<ThumbImgData>) => Array<ThumbImgSerialized>
  getSearchResults: (media_type: 'image' | 'audio', value: string) => void
  constructor() {
    super()
    this.collectRESTData = this.collectRESTData.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
    this.serializeData = this.serializeData.bind(this)
  }
  state = {
    imgThumbData: [{ src: ' ', key: ' ', alt: ' ' }],
  }
  collectRESTData(data: Array<ThumbImgData>) {
    const itemList = data ? data : emptyCollection
    const itemsSanitized = this.serializeData(itemList)
    this.setState(() => {
      return { imgThumbData: itemsSanitized }
    })
  }
  getSearchResults(media_type: 'image' | 'audio', value: string): void {
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
    this.getSearchResults('image', '')
  }
  render() {
    return (
      <Router>
        <section>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/search" />} />
            <Route
              exact
              path="/search"
              render={() => (
                <ScreenImgSearch
                  data={this.state.imgThumbData}
                  getSearchResults={this.getSearchResults}
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
