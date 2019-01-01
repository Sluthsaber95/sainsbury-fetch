// @flow
import React, { Component } from 'react'

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
  data: Array<ThumbImgSerialized>,
  search: string,
}

type Props = {
  data: Array<ThumbImgSerialized>,
  getSearchResults: Function,
}

type DerivedSP = {
  data: Array<ThumbImgSerialized>,
}

export default class ImgSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: [{ src: ' ', key: ' ', alt: ' ' }],
      search: '',
    }
  }
  static getDerivedStateFromProps = (
    nextProps: DerivedSP,
    prevState: DerivedSP
  ) => {
    return nextProps.data === prevState.data ? {} : { data: nextProps.data }
  }
  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.getSearchResults('image', event.target.value)
  }
  render() {
    return (
      <section>
        <article className="search-bar-wrapper">
          <SearchBar callback={this.handleChange} />
        </article>
        <ImagesDisplayed collection={this.state.data} />
      </section>
    )
  }
}
