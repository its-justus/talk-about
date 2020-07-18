import React, {Component} from 'react';
import {
  MemoryRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import Main from '../Main/Main';
import InfoPage from '../InfoPage/InfoPage';
import Box from '@material-ui/core/Box';

import './App.css';

class App extends Component {
  render() {
    return (
			<Box display="flex" height='100vh'>
      <Router>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/main" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <ProtectedRoute
              exact
              path="/main"
              component={Main}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
      </Router>
			</Box>
  )}
}

export default connect()(App);
