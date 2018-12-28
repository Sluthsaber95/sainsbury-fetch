// @flow
import React from "react";
import { DebounceInput } from "react-debounce-input";

import "./SearchBar.scss";

type Props = {
  value: string,
  callback: (event: SyntheticInputEvent<HTMLInputElement>) => void
};

export default function SearchBar(props: Props) {
  return (
    <DebounceInput
      className="search-bar"
      minLength={3}
      debounceTimeout={1000}
      placeholder="apollo 11, mars, ISS ..."
      onChange={event => props.callback(event)}
      value={props.value}
      type="text"
    />
  );
}
