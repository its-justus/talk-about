import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

  render() {
    return (
      <Grid container justify="center">
        <Grid item className="login-title" xs={12}>
          <Box marginTop={15} margin={5}>
            <Typography variant="h2" align="center">
              TalkAbout
            </Typography>
            <Typography variant="h6" align="center">
              Your place to talk about anything
            </Typography>
          </Box>
        </Grid>
        <Grid item className="login-error" xs={12}>
          {this.props.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.loginMessage}
            </h2>
          )}
        </Grid>
        <Grid item className="login-form" xs={4}>
          <form onSubmit={this.login}>
            <Grid container justify="center" alignItems="center" spacing={1}>
              <Grid item className="login-form-heading" xs={12}>
                <Typography variant="subtitle2" align="center">
                  Please sign in
                </Typography>
              </Grid>
              <Grid item className="login-form-fields" xs={12} align="center">
                <TextField
                  required
                  id="username-input"
                  label="Username"
                  variant="filled"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor("username")}
                />
              </Grid>
              <Grid item className="login-form-fields" xs={12} align="center">
                <TextField
                  required
                  id="password-input"
                  label="Password"
                  type="password"
                  variant="filled"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </Grid>
              <Grid item className="login-form-register" xs={4} align="center">
                <Button
                  onClick={() => {
                    this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
                  }}
                >
                  Register
                </Button>
              </Grid>
              <Grid item className="login-form-sign-in" xs={4} align="center">
                <Button type="submit">Sign In</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
