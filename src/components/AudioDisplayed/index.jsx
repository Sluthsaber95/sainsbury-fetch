// @flow
import React from 'react'

interface AudioDataSerialized {
  description: string;
  location: string;
  media_type: string;
  nasa_id: string;
  photographer: string;
}

type Props = {
  collection: AudioDataSerialized,
}

export default function AudioDisplayed(props: Props) {
  const { collection } = props
  return <div>{collection.photographer}</div>
}
