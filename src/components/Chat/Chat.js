import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class Chat extends React.Component {
  render() {
    return (
      <Box height="100%" display="flex" bgcolor="grey.100">
        <Box height="90%" display="flex" bgcolor="grey.300">
          {"Chat lol"}
        </Box>
        <Box height={150} bgcolor="grey.500">
          Input lol
        </Box>
      </Box>
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
export default connect(mapStateToProps)(Chat);
