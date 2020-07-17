import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
		this.props.dispatch({type: "CLEAR_REGISTRATION_ERROR"});
	}

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
        <Grid item className="login-form" xs={4}>
          <form onSubmit={this.registerUser}>
            <Grid container justify="center" alignItems="center" spacing={1}>
              <Grid item className="login-form-heading" xs={12}>
                <Typography variant="subtitle2" align="center">
                  Please register a username and password
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
                    this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
                  }}
                >
                  Back
                </Button>
              </Grid>
              <Grid item className="login-form-sign-in" xs={4} align="center">
                <Button type="submit">Register</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Snackbar
          open={this.props.errors.registrationMessage}
          autoHideDuration={5 * 1000}
          onClose={this.handleErrorClose}
        >
					<MuiAlert elevation={6} variant="outlined" onClose={this.handleErrorClose} severity="error">
						{this.props.errors.registrationMessage}
					</MuiAlert>
				</Snackbar>
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

export default connect(mapStateToProps)(RegisterPage);
