// @flow
import React from 'react'

interface Metadata {
  description: string;
  location: string;
  photographer: string;
  title: string;
}

type Props = {
  nasa_id: string,
  metadata: Metadata,
}

export default function AssetLayout(props: Props) {
  const { nasa_id, metadata } = props
  const { description, location, photographer, title } = metadata
  return (
    <div>
      <div>{location}</div>
      <div>{description}</div>
      <div>{title}</div>
      <div>{photographer}</div>
      <img
        src={`http://images-assets.nasa.gov/image/${nasa_id}/${nasa_id}~medium.jpg`}
        alt={location}
      />
    </div>
  )
}
