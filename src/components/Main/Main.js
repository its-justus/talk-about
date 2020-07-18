import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import Chat from "../Chat/Chat";
import MemberList from "../MemberList/MemberList";
import TopicExplorer from "../TopicExplorer/TopicExplorer";
import Nav from "../Nav/Nav";

class Main extends React.Component {
  render() {
    if (this.props.status === "STARTING") {
      return <>Loading...</>;
    } else if (this.props.status === "OKAY") {
      return (
        <Grid container spacing={0}>
          <Grid item name="navbar" xs={12}>
            <Nav />
          </Grid>
          <Hidden xsDown>
            <Grid item name="left-section">
              <Box
                width={200}
                height="100%"
                padding={1}
                bgcolor="primary.main"
                borderRight={3}
                borderColor="error.main"
                color="secondary.light"
              >
                <TopicExplorer />
              </Box>
            </Grid>
          </Hidden>
          <Grid item name="center-section" xs>
            <Chat />
          </Grid>
          <Hidden xsDown>
            <Grid item name="right-section">
              <Box width={200}>
                <MemberList />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      );
    }
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  status: state.status,
});

export default connect(mapStateToProps)(Main);
