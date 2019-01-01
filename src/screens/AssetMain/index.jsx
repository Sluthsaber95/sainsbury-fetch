// @flow
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import AssetLayout from './AssetLayout'

type State = {
  description: string,
  location: string,
  photographer: string,
  title: string,
}

type Props = {
  match: Object,
}

export default class AssetMain extends Component<Props, State> {
  getImgData: () => void
  constructor(props: Props) {
    super(props)
    this.state = {
      description: '',
      location: '',
      photographer: '',
      title: '',
    }
    this.getImgData = this.getImgData.bind(this)
  }
  getImgData() {
    const nasa_id = this.props.match.params.nasa_id
    return axios
      .get(`https://images-assets.nasa.gov/image/${nasa_id}/metadata.json`, {})
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          const description = response.data['AVAIL:Description']
          const location = response.data['AVAIL:Location']
          const photographer =
            response.data['AVAIL:Photographer'] === ''
              ? 'Photography Unknown'
              : response.data['AVAIL:Photographer']
          const title = /^KSC/.test(response.data['AVAIL:Title'])
            ? '[ No Title]'
            : response.data['AVAIL:Title']

          this.setState(() => {
            return {
              description,
              location,
              photographer,
              title,
            }
          })
        }
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
  componentDidMount() {
    this.getImgData()
  }
  render() {
    const { match } = this.props
    const { params, url } = match
    return (
      <section>
        <Route
          path={`${url}`}
          render={() => (
            <AssetLayout
              metadata={{ ...this.state }}
              nasa_id={params.nasa_id}
            />
          )}
        />
      </section>
    )
  }
}
