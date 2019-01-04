// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import './BackButton.scss'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    ...theme.typography.button,
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    justifyContent: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 0,
    float: 'right',
    color: '#00695c',
  },
})

type Classes = {
  root: Object,
  btn: Object,
  paper: Object,
  progress: Object,
}

type Props = {
  classes: Classes,
}

type State = {
  showLoading: boolean,
}

class BackButton extends Component<Props, State> {
  state = {
    showLoading: false,
  }
  clickHandler = () => {
    this.setState({ showLoading: true })
  }
  render() {
    const { showLoading } = this.state
    console.log(showLoading)
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Link to="/search">
          <Typography
            className={classes.btn}
            onClick={this.clickHandler}
            variant="h5"
            component="p"
          >
            <ArrowBack />
            <span style={{ paddingLeft: 5, textDecoration: 'none' }}>Back</span>
            <span className="icon-loading">
              {showLoading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                  thickness={5}
                />
              )}
            </span>
          </Typography>
        </Link>
      </Paper>
    )
  }
}

export default withStyles(styles)(BackButton)
