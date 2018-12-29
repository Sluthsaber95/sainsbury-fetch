// @flow
import * as React from 'react'

import ImageWrapper, { defaultValues } from './ImageWrapper'

type Props = {
  collection: $ReadOnlyArray<{ src: string, alt: string }>,
}

export default function ImagesDisplayed(props: Props) {
  return (
    <section>
      {props.collection.map(({ alt, src }) => {
        return <ImageWrapper src={src} alt={alt} />
      })}
    </section>
  )
}

ImagesDisplayed.defaultProps = {
  collection: [defaultValues],
}
