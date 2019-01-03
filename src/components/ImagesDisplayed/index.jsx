// @flow
import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

import ImageWrapper from './ImageWrapper'
import ImagesNoResults from './ImagesNoResults'

type Props = {
  collection: $ReadOnlyArray<{ src: string, alt: string, key: string }>,
}

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  }
});

function ImagesDisplayed(props: Props) {
  const { collection } = props
  return (
    <section className="img-display">
      <Grid container spacing={0}>
        {collection.length === 0 ? (
          <ImagesNoResults />
        ) : (
          collection.map(({ alt, src, key }, i) => {
            return (
              <Grid item xs={6} sm={4}>
                <ImageWrapper
                  src={src}
                  alt={alt}
                  key={key + `${i}`}
                  nasa_id={key}
                />
              </Grid>
            )
          })
        )}
      </Grid>
    </section>
  )
}

ImagesDisplayed.defaultProps = {
  collection: [
    {
      alt: '',
      key: '',
      src: '',
    },
  ],
}

export default withStyles(styles)(ImagesDisplayed)