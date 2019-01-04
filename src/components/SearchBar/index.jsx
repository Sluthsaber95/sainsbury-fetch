// @flow
import React from 'react'
import { Debounce } from 'react-throttle'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  }
};

type Props = {
  callback: (event: SyntheticInputEvent<HTMLInputElement>) => void,
}

function SearchBar(props: Props) {
  const { classes } = props
  return (
    <Paper className={classes.root} elevation={1}>
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      <Debounce time="300" handler="onChange">
        <InputBase 
          className={`${classes.input} search-bar`} 
          onChange={event => props.callback(event)}
          placeholder="Search"
        />
      </Debounce>
    </Paper>
  )
}

export default withStyles(styles)(SearchBar)
//   className="search-bar"
  // <DebounceInput
  //   minLength={1}
  //   debounceTimeout={1000}
  //   placeholder="Search"
  //   onChange={event => props.callback(event)}
  //   type="text"
  // />
