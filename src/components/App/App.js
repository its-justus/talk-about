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
              <Redirect exact from="/" to="/main" />
              <ProtectedRoute exact path="/main" component={Main} />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <><h1>You seem to be lost</h1><a href="http://localhost:.3000">Let's go back.</a></>} />
            </Switch>
          </Router>
        </Box>
      </>
    );
  }
}

export default connect()(App);
