// @flow
import React, { Fragment } from 'react'

import ImageFallback from './ImageFallback'

type Props = {
  alt: string,
  src: string,
}

export default function ImageWrapper(props: Props) {
  const { alt, src } = props
  return (
    <Fragment>{src ? <img alt={alt} src={src} /> : <ImageFallback />}</Fragment>
  )
}

export const defaultValues = {
  src: '',
  alt: '',
}

ImageWrapper.defaultProps = defaultValues
