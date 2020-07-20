import React, { Component } from "react";
import {
  MemoryRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Box from "@material-ui/core/Box";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Box
          name="root"
          display="flex"
          height="100vh"
          width="100vw"
          margin={0}
          padding={0}
        >
          <Router>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/main" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <ProtectedRoute exact path="/main" component={Main} />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Router>
        </Box>
      </>
    );
  }
}

export default connect()(App);
