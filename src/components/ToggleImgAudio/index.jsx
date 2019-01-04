// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import './ToggleImgAudio.scss'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    'flex-direction': 'row',
  },
})

type Classes = {
  root: Object,
  formControl: Object,
  group: Object,
}

type Props = {
  classes: Classes,
  handleOptionChange: Function,
  selectedOption: string,
}

function ToggleImgAudio(props: Props) {
  const { classes, handleOptionChange, selectedOption } = props
  return (
    <FormControl className={`${classes.root} toggle-ia__wrapper`}>
      <RadioGroup
        aria-label="image or audio selection"
        name="imageAudio"
        className={classes.group}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <FormControlLabel
          value="image"
          control={<Radio className="radio-img" />}
          label="Images"
        />
        <FormControlLabel
          value="audio"
          control={<Radio className="radio-audio" />}
          label="Audio"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default withStyles(styles)(ToggleImgAudio)
