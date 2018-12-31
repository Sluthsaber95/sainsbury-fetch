// @flow
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import ScreenImgSearch from './screens/ImgSearch'

const App = () => (
  <Router>
    <section>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/search" />} />
        <Route exact path="/search" render={() => <ScreenImgSearch />} />
      </Switch>
    </section>
  </Router>
)

export default App
