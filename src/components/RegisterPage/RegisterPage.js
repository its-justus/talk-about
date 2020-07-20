import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.dispatch({ type: "CLEAR_REGISTRATION_ERROR" });
  };

  render() {
    return (
			<Box justifyContent="center" marginTop="20vh"  width="100%" >
      <Box name="register-container" display="flex" flexDirection="column">
        <Box name="title">
          <Typography variant="h2" align="center" color="primary">
            TalkAbout
          </Typography>
          <Typography variant="h6" align="center" color="primary">
            Your place to talk about anything
          </Typography>
        </Box>
          <form onSubmit={this.registerUser}>
					<Box name="register-form" alignContent="center">
            <Box name="register-message" paddingTop={3} paddingBottom={1}>
              <Typography variant="subtitle2" align="center" color="primary">
                Please register a username and password
              </Typography>
            </Box>
            <Box name="fields" textAlign="center">
              <Box padding={0.5}>
                <TextField
                  required
                  id="username-input"
                  label="Username"
                  variant="filled"
                  color="primary"
                  value={this.state.username}
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
                <Box paddingX={4}>
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
                  }}
                >
                  Back
                </Button>
              </Box>
              <Box paddingX={4}>
                <Button type="submit" color="primary">
                  {'Register & Sign In'}
                </Button>
              </Box>
            </Box>
						</Box>
          </form>

        <Snackbar
          open={this.props.errors.registrationMessage}
          autoHideDuration={5 * 1000}
          onClose={this.handleErrorClose}
        >
          <MuiAlert
            elevation={6}
            variant="outlined"
            onClose={this.handleErrorClose}
            severity="error"
          >
            {this.props.errors.registrationMessage}
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

export default connect(mapStateToProps)(RegisterPage);
