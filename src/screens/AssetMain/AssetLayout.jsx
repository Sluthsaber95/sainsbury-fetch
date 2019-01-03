// @flow
import React from 'react'
import Img from 'react-image'
import ReactAudioPlayer from 'react-audio-player'
import axios from 'axios'

interface Metadata {
  description: string;
  location: string;
  photographer: string;
  title: string;
}

type Props = {
  nasa_id: string,
  media_type: string,
  metadata: Metadata,
}

export default function AssetLayout(props: Props) {
  const { media_type, metadata, nasa_id } = props
  const { description, location, photographer, title } = metadata
  const src = media_type === 'image'
      ? `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}~medium.jpg`
      : undefined
    
  let brokenLinkPresent = false
  try {
    axios.get(`http://images-assets.nasa.gov/audio/${nasa_id}/${nasa_id}~128k.mp3`)
  } catch (e){
    brokenLinkPresent = true
  }
  return (
    <div>
      <div>{location}</div>
      <div>{description}</div>
      <div>{title}</div>
      <div>{photographer}</div>
      <Img src={src} alt={location} />
      {
        !brokenLinkPresent && (
          <ReactAudioPlayer
            src={`http://images-assets.nasa.gov/audio/${nasa_id}/${nasa_id}~128k.mp3`}
            controls
          />
        )
      }

    </div>
  )
}
