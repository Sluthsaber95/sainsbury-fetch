// @flow
import React from 'react'
import { DebounceInput } from 'react-debounce-input'

import './SearchBar.scss'

type Props = {
  value: string,
  callback: (event: SyntheticInputEvent<HTMLInputElement>) => void,
}

export default function SearchBar(props: Props) {
  return (
    <DebounceInput
      className="search-bar"
      minLength={1}
      debounceTimeout={1000}
      placeholder="Apollo 11, Mars, ISS ..."
      onChange={event => props.callback(event)}
      value={props.value}
      type="text"
    />
  )
}
