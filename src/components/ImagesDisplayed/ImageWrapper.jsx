// @flow
import React, { Fragment } from 'react'

type Props = {
  alt: string,
  src: string,
}

export default function ImageWrapper(props: Props) {
  const { alt, src } = props
  return (
    <Fragment>
      {src !== 'Not Real Source' && <img alt={alt} src={src} />}
    </Fragment>
  )
}

export const defaultValues = {
  src: 'Not Real Source',
  alt: '',
}

ImageWrapper.defaultProps = defaultValues
