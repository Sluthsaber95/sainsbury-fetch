// @flow
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import AssetLayout from './AssetLayout'

type NextPPrevS = {
  media_type: string,
}

type JSONImg = {
  'AVAIL:Description': string,
  'AVAIL:Location': string,
  'AVAIL:Photographer': string,
  'AVAIL:Title': string,
}

type JSONAudio = {
  'AVAIL:Description': string,
  'AVAIL:Location': string,
  'AVAIL:Title': string,
}

type State = {
  description: string,
  location: string,
  photographer: string,
  title: string,
}

type Props = {
  match: Object,
  media_type: 'image' | 'audio',
}

export default class AssetMain extends Component<Props, State> {
  getData: () => void
  serializeAudioJSONL: (data: JSONAudio) => void
  serializeImgJSON: (data: JSONImg) => void
  constructor(props: Props) {
    super(props)
    this.state = {
      description: '',
      location: '',
      photographer: '',
      title: '',
      nasa_id: '',
    }
    this.getData = this.getData.bind(this)
    this.serializeImgJSON = this.serializeImgJSON.bind(this)
  }
  static getDerivedStateFromProps = (
    nextProps: NextPPrevS,
    prevState: NextPPrevS
  ) => {
    if (nextProps.media_type !== prevState.media_type) {
      return { media_type: nextProps.media_type }
    }
    return {}
  }
  getData() {
    const nasa_id = this.props.match.params.nasa_id
    const media_type = this.props.media_type
    try {
      axios
        .get(`https://images-assets.nasa.gov/${media_type}/${nasa_id}/metadata.json`)
        .then(response => {
          const { data, status } = response
          if (status >= 200 && status < 400) {
            return media_type === 'image'
              ? this.serializeImgJSON(data)
              : this.serializeAudioJSON(data)
          } else {
            return new Error('')
          }
        })
    } catch (e) {
      console.log(e)
    } finally {
      axios
        .get(
          `https://images-assets.nasa.gov/audio/${nasa_id}/metadata.json`,
          {}
        )
        .then(response => {
          const { data, status } = response
          if (status >= 200 && status < 400) {
            return media_type === 'image'
              ? this.serializeImgJSON(data)
              : this.serializeAudioJSON(data)
          } else {
            return new Error('asdf')
          }
        })
    }
  }
  serializeImgJSON(data: JSONImg) {
    const description = data['AVAIL:Description']
    const location = data['AVAIL:Location']
    const photographer =
      data['AVAIL:Photographer'] === ''
        ? 'Photographer Unknown'
        : data['AVAIL:Photographer']
    const title = data['AVAIL:Title']

    this.setState(() => {
      return {
        description,
        location,
        photographer,
        title,
      }
    })
  }
  serializeAudioJSON(data: JSONAudio) {
    const description = data['AVAIL:Description']
    const location = data['AVAIL:Location']
    const title = data['AVAIL:Title']
    this.setState(() => {
      return {
        description,
        location,
        title,
      }
    })
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    const { match, media_type } = this.props
    const { params, url } = match
    return (
      <section>
        <Route
          path={`${url}`}
          render={() => (
            <AssetLayout
              media_type={media_type}
              metadata={{ ...this.state }}
              nasa_id={params.nasa_id}
            />
          )}
        />
      </section>
    )
  }
}
