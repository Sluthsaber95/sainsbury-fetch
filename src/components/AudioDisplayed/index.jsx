// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Audiotrack from '@material-ui/icons/Audiotrack'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

interface AudioDataSerialized {
  description: string;
  location: string;
  nasa_id: string;
}

type Props = {
  collection: Array<AudioDataSerialized>,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function AudioDisplayed(props: Props) {
  const { classes, collection } = props
  return (
    <section>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List dense={false}>
              {
                collection.map(({ description, location, nasa_id }) => {
                  const shortenDescription = text => {
                    if (!text) {
                      return ''
                    } else if (text.length > 100) {
                      return text.slice(0, 99) + '...'
                    }
                    return text
                  }
                  const finalDescription = shortenDescription(description)
                  return (
                    <Fragment>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <Audiotrack />
                        </ListItemIcon>
                        <Link to={`/asset/${nasa_id}`} key={nasa_id} style={{ 'text-decoration': 'none' }}>
                          <ListItemText
                            primary={finalDescription}
                            secondary={location}
                          />
                        </Link>
                      </ListItem>
                    </Fragment>
                  )
                })
              }
            </List>
          </div>
        </Grid>
      </Grid>
      {}
    </section>
  )
}

export default withStyles(styles)(AudioDisplayed)