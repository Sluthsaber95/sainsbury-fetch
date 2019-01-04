// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import './ImageWrapper.scss'

type Props = {
  alt: string,
  src: string,
  nasa_id: string,
}

export default function ImageWrapper(props: Props) {
  const { alt, src, nasa_id } = props

  return (
    <article className="img-thumb__container">
      <div className="img-thumb__wrapper">
        {src !== 'Not Real Source' && (
          <Link to={`/asset/${nasa_id}`}>
            <Img className="img-thumb" alt={alt} src={src} />
          </Link>
        )}
      </div>
    </article>
  )
}

export const defaultValues = {
  src: 'Not Real Source',
  alt: '',
}

ImageWrapper.defaultProps = defaultValues
