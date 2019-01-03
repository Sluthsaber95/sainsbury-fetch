// @flow
import React from 'react'

type Props = {
  handleOptionChange: Function,
  selectedOption: string,
}

export default function ToggleImgAudio(props: Props) {
  const { handleOptionChange, selectedOption } = props
  return (
    <div>
      <form>
        <div className="radio">
          <label>
            <input
              checked={selectedOption === 'image'}
              onChange={handleOptionChange}
              type="radio"
              value="image"
            />
            Images
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              checked={selectedOption === 'audio'}
              onChange={handleOptionChange}
              type="radio"
              value="audio"
            />
            Audio
          </label>
        </div>
      </form>
    </div>
  )
}
