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
    <section>
      {collection.length > 0 && collection[0].src !== undefined ? (
        collection.map(({ alt, src, key }) => {
          return <ImageWrapper src={src} alt={alt} key={key} />
        })
      ) : (
        <ImagesNoResults />
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
