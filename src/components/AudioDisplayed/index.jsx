// @flow
import React from 'react'
import { Link } from 'react-router-dom'

interface AudioDataSerialized {
  description: string;
  location: string;
  nasa_id: string;
}

type Props = {
  collection: Array<AudioDataSerialized>,
}

export default function AudioDisplayed(props: Props) {
  const { collection } = props
  return (
    <section>
      {collection.map(({ description, location, nasa_id }) => {
        const shortenDescription = text => {
          if (!text) {
            return ''
          } else if (text.length > 100) {
            return text.slice(0, 99) + '...'
          }
          return text
        }
        const finalDescription = shortenDescription(description)
        return (
          <Link to={`/asset/${nasa_id}`} key={nasa_id}>
            <article>
              <div>{finalDescription}</div>
              <h5>{location}</h5>
            </article>
          </Link>
        )
      })}
    </section>
  )
}
