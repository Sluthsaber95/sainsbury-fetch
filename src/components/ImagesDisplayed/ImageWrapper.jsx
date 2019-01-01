// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  alt: string,
  src: string,
  nasa_id: string,
}

export default function ImageWrapper(props: Props) {
  const { alt, src, nasa_id } = props

  return (
    <Fragment>
      {src !== 'Not Real Source' && (
        <Link to={`/asset/${nasa_id}`}>
          <img className="img-thumb" alt={alt} src={src} />
        </Link>
      )}
    </Fragment>
  )
}

export const defaultValues = {
  src: 'Not Real Source',
  alt: '',
}

ImageWrapper.defaultProps = defaultValues
