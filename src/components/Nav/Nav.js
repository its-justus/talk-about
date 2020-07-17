import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { Typography, Grid } from "@material-ui/core";

const Nav = (props) => (
  <div className="nav">
    <Grid container>
      <Grid item xs>
        <Typography variant="overline" color="secondary">
          TalkAbout
        </Typography>
      </Grid>
      <Grid item xs>
        <div className="nav-right">
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {props.user.id && (
            <>
              <LogOutButton className="nav-link" />
            </>
          )}
          {/* Always show this link since the about page is not protected */}
          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
      </Grid>
    </Grid>

    {/* <h2 className="nav-title">TalkAbout</h2> */}
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
