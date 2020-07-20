import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withTheme } from "@material-ui/core";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.dispatch({ type: "CLEAR_LOGIN_ERROR" });
  };

  render() {
    return (
      <Box justifyContent="center" marginTop="20vh" width="100%">
        <Box name="login-container" display="flex" flexDirection="column">
          <Box name="title">
            <Typography variant="h2" align="center" color="primary">
              TalkAbout
            </Typography>
            <Typography variant="h6" align="center" color="primary">
              Your place to talk about anything
            </Typography>
          </Box>
          <form onSubmit={this.login}>
            <Box name="login-form" alignContent="center">
              <Box name="login-message" paddingTop={3} paddingBottom={1}>
                <Typography variant="subtitle2" align="center" color="primary">
                  Please sign in
                </Typography>
              </Box>
              <Box name="fields" textAlign="center">
                <Box padding={0.5}>
                  <TextField
                    required
                    id="username-input"
                    label="Username"
                    variant="filled"
                    value={this.state.username}
                    color="primary"
                    onChange={this.handleInputChangeFor("username")}
                  />
                </Box>
                <Box padding={0.5}>
                  <TextField
                    required
                    id="password-input"
                    label="Password"
                    type="password"
                    variant="filled"
                    color="primary"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor("password")}
                  />
                </Box>
              </Box>
              <Box name="buttons" justifyContent="center" display="flex">
                <Box paddingX={5}>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
                    }}
                  >
                    Register
                  </Button>
                </Box>
                <Box paddingX={5}>
                  <Button type="submit" color="primary">
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>

          <Snackbar
            open={this.props.errors.loginMessage}
            autoHideDuration={5 * 1000}
            onClose={this.handleErrorClose}
          >
            <MuiAlert
              elevation={6}
              variant="outlined"
              onClose={this.handleErrorClose}
              severity="error"
            >
              {this.props.errors.loginMessage}
            </MuiAlert>
          </Snackbar>
        </Box>
      </Box>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default withTheme(connect(mapStateToProps)(LoginPage));
