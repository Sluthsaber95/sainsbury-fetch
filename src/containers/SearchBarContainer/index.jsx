// @flow
import React, { Component } from 'react'
import axios from 'axios'

import SearchBar from '../../components/SearchBar'

type Props = {}
type State = {
  value: string,
  searchResults?: Object,
}

export default class SearchBarContainer extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      value: '',
      searchResults: {},
    }
  }
  getSearchResults = (media_type: 'image' | 'audio') => {
    return axios
      .get(`https://images-api.nasa.gov/search?`, {
        params: {
          q: this.state.value,
          media_type,
        },
      })
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          console.log(response.data.collection.items.filter((_, i) => i < 10))
          const responseItemList = response.data.collection.items
          return responseItemList.filter((_, i) => i < 10)
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
  render() {
    return (
      <section>
        <article className="search-bar-wrapper">
          <SearchBar callback={this.handleChange} value={this.state.value} />
        </article>
      </section>
    )
  }
}
