import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import Chat from "../Chat/Chat";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Grid container justify="center">
				<Hidden xsDown>
          <Grid item name="left-section">
					<Box width={200}>left box</Box>
          </Grid>
					</Hidden>
          <Grid item name="center-section" xs>
            <Chat />
          </Grid>
					<Hidden xsDown>
          <Grid item name="right-section">
					<Box width={200}>right box</Box>
          </Grid>
					</Hidden>
        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Main);
