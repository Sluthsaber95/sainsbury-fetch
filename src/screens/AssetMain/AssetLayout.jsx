// @flow
import React from 'react'
import Img from 'react-image'
import ReactAudioPlayer from 'react-audio-player'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';

import BackButton from '../../components/BackButton'
import './AssetLayout.scss'
import { Typography } from '@material-ui/core';

interface Metadata {
  description: string;
  location: string;
  photographer: string;
  title: string;
}

type Props = {
  nasa_id: string,
  media_type: string,
  metadata: Metadata,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  caption: {
    margin: '0.5em 0'
  },
  title: {
    margin: '0.8em 0'
  },
  description: {
    color: grey[800] //#424242
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

function AssetLayout(props: Props) {
  const { classes, media_type, metadata, nasa_id } = props
  const { description, location, photographer, title } = metadata
  const src = media_type === 'image'
    ? `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}~medium.jpg`
    : undefined

  let brokenLinkPresent = false
  try {
    axios.get(`http://images-assets.nasa.gov/audio/${nasa_id}/${nasa_id}~128k.mp3`)
  } catch (e) {
    brokenLinkPresent = true
  }

  const caption = (photographer, location) => {
    const startText = 'Photo Taken By:'
    if(photographer && location) {
      return `${startText} ${photographer} - at ${location}`
    }
    else if(photographer) {
      return `${startText} ${photographer}`
    }
    else if(location) {
      return `${location}`
    }
    return ''
  }
  // photographer && (`Photo Taken By: ${photographer} - at ${location && `at ${location}`}` )
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <BackButton />
        </Grid>
        <Grid item xs={12}>
          <article className="img-main__wrapper">
            <Img src={src} className="img-main" alt={location} />
            <Typography
              className={classes.caption}
              variant="caption"
            >{caption(photographer, location)}
            </Typography>
          </article>
        </Grid>
        <Grid item xs={12} sm={6}>
          <article className="img-main__text">
            <Typography
              className={classes.title}
              variant="title"
            >
              {title}
            </Typography>
            <Typography className={classes.description}gutterBottom>
              {description}
            </Typography>
          </article>
        </Grid>
        <Grid xs={12}>
          <Paper className="audio-player__wrapper" elevation={0}>
            {
              !brokenLinkPresent && (
                <ReactAudioPlayer className="audio-player"
                  src={`http://images-assets.nasa.gov/audio/${nasa_id}/${nasa_id}~128k.mp3`}
                  controls
                />
              )
            }
          </Paper>
        </Grid>
      </Grid>

    </div>
  )
}

export default withStyles(styles)(AssetLayout)