// @flow
import React, { Component } from 'react'

import AudioDisplayed from '../../components/AudioDisplayed'
import ImagesDisplayed from '../../components/ImagesDisplayed'
import SearchBar from '../../components/SearchBar'
import ToggleImgAudio from '../../components/ToggleImgAudio'

interface ThumbImgSerialized {
  alt: string;
  key: string;
  src: string;
}

type State = {
  dataImg: Array<ThumbImgSerialized>,
  search: string,
  selectedOption: string,
}

type Props = {
  dataImg: Array<ThumbImgSerialized>,
  getSearchResults: Function,
}

type DerivedSP = {
  dataImg: Array<ThumbImgSerialized>,
}

export default class ImgSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      dataImg: [{ src: ' ', key: ' ', alt: ' ' }],
      search: '',
      selectedOption: 'image',
      value: '',
    }
  }
  static getDerivedStateFromProps = (
    nextProps: DerivedSP,
    prevState: DerivedSP
  ) => {
    if (nextProps.dataAudio !== prevState.dataAudio) {
      return { dataAudio: nextProps.dataAudio }
    }
    if (nextProps.dataImg !== prevState.dataImg) {
      return { dataImg: nextProps.dataImg }
    }
    return {}
  }
  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const eventVal =
      event && event.target ? event.target.value : this.state.value
    const option = this.state.selectedOption
    this.setState(() => {
      this.props.getSearchResults(option, eventVal)
      return { value: eventVal }
    })
  }
  handleOptionChange = event => {
    this.setState({
      selectedOption: event.target.value,
    })
  }
  componentDidMount() {
    this.handleInputChange('')
  }
  componentDidUpdate(_, prevState) {
    if (this.state.selectedOption !== prevState.selectedOption) {
      this.handleInputChange(this.state.selectedOption, this.state.value)
    }
  }
  render() {
    const { dataAudio, dataImg, selectedOption } = this.state
    return (
      <section>
        <article className="search-bar-wrapper">
          <SearchBar callback={this.handleInputChange} />
          <ToggleImgAudio
            handleOptionChange={this.handleOptionChange}
            selectedOption={selectedOption}
          />
        </article>
        {selectedOption === 'image' ? (
          <ImagesDisplayed collection={dataImg} />
        ) : (
          <AudioDisplayed collection={dataAudio} />
        )}
      </section>
    )
  }
}
