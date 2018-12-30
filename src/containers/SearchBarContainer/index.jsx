// @flow
import React, { Component } from 'react'
import axios from 'axios'

import SearchBar from '../../components/SearchBar'

type Props = {
  collectData: Function,
}

type State = {
  value: string,
}

export default class SearchBarContainer extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      value: '',
    }
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
          this.props.collectData(responseItemList.filter((_, i) => i < 20))
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
  componentDidMount() {
    this.setState({ value: '' })
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
