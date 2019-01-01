// @flow
import * as React from 'react'

import ImageWrapper from './ImageWrapper'
import ImagesNoResults from './ImagesNoResults'

type Props = {
  collection: $ReadOnlyArray<{ src: string, alt: string, key: string }>,
}

export default function ImagesDisplayed(props: Props) {
  const { collection } = props
  return (
    <section className="img-display">
      {collection.length === 0 ? (
        <ImagesNoResults />
      ) : (
        collection.map(({ alt, src, key }) => {
          return <ImageWrapper src={src} alt={alt} key={key} nasa_id={key} />
        })
      )}
    </section>
  )
}

ImagesDisplayed.defaultProps = {
  collection: [
    {
      alt: '',
      key: '',
      src: '',
    },
  ],
}
