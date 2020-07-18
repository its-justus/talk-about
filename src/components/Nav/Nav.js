import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { Typography, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Nav = (props) => (
  <Box bgcolor="primary.main">
    <Grid container justify="space-between" alignItems="">
      <Grid item xs justify="flex-start">
        <Typography variant="overline" color="secondary">
          TalkAbout
        </Typography>
      </Grid>
      <Grid item xs>
        <Box display="flex" flexDirection="row-reverse">
          <LogOutButton className="nav-link" />
          <Link className="nav-link" to="/about">
            About
          </Link>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
