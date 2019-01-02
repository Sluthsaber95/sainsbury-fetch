// @flow
import React from 'react'
import Img from 'react-image'

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
  const src =
    media_type === 'image'
      ? `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}~medium.jpg`
      : undefined
  return (
    <div>
      <div>{location}</div>
      <div>{description}</div>
      <div>{title}</div>
      <div>{photographer}</div>
      {media_type === 'image' ? (
        <img src={src} alt={location} />
      ) : (
        <Img src={src} alt={location} />
      )}
    </div>
  )
}
