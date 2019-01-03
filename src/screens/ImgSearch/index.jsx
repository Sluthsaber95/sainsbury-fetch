// @flow
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AudioDisplayed from '../../components/AudioDisplayed'
import ImagesDisplayed from '../../components/ImagesDisplayed'
import SearchBar from '../../components/SearchBar'
import ToggleImgAudio from '../../components/ToggleImgAudio'

interface ThumbImgSerialized {
  alt: string;
  key: string;
  src: string;
}

type State = {
  dataImg: Array<ThumbImgSerialized>,
  search: string,
  selectedOption: string,
}

type Props = {
  dataImg: Array<ThumbImgSerialized>,
  getSearchResults: Function,
}

type DerivedSP = {
  dataImg: Array<ThumbImgSerialized>,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ImgSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      dataImg: [{ src: ' ', key: ' ', alt: ' ' }],
      search: '',
      selectedOption: 'image',
      value: '',
    }
  }
  static getDerivedStateFromProps = (
    nextProps: DerivedSP,
    prevState: DerivedSP
  ) => {
    if (nextProps.dataAudio !== prevState.dataAudio) {
      return { dataAudio: nextProps.dataAudio }
    }
    if (nextProps.dataImg !== prevState.dataImg) {
      return { dataImg: nextProps.dataImg }
    }
    return {}
  }
  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const eventVal =
      event && event.target ? event.target.value : this.state.value
    const option = this.state.selectedOption
    this.setState(() => {
      this.props.getSearchResults(option, eventVal)
      return { value: eventVal }
    })
  }
  handleOptionChange = event => {
    this.setState({
      selectedOption: event.target.value,
    })
  }
  componentDidMount() {
    this.handleInputChange('')
  }
  componentDidUpdate(_, prevState) {
    if (this.state.selectedOption !== prevState.selectedOption) {
      this.handleInputChange(this.state.selectedOption, this.state.value)
    }
  }
  render() {
    const { dataAudio, dataImg, selectedOption } = this.state
    const { classes } = this.props
    return (
      <section className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <SearchBar callback={this.handleInputChange} />
          </Grid>
          <Grid item xs={12}>
            <ToggleImgAudio
              handleOptionChange={this.handleOptionChange}
              selectedOption={selectedOption}
            />
          </Grid>
        {/* <article className="search-bar-wrapper">
        </article> */}
            {selectedOption === 'image' ? (
              <ImagesDisplayed collection={dataImg} />
              ) : (
              <AudioDisplayed collection={dataAudio} />
              )
            }
        </Grid>
      </section>
    )
  }
}

export default withStyles(styles)(ImgSearch)