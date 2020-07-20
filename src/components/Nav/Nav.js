import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import { Typography, Grid, AppBar, Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Nav = (props) => {
  return (
    <Box
			display="flex"
			flexGrow={1}
      bgcolor="secondary.light"
      height="25px"
      width="100%"
      alignItems="center"
    >
      <Box name="mini-title" display="flex" flexGrow={1} justifySelf="flex-start" paddingX={1}>
        <Typography
          variant="subtitle1"
          style={{ fontFamily: "Fredoka One" }}
          color="primary"
        >
          TalkAbout
        </Typography>
      </Box>
      <Box name="logout" display="flex" justifySelf="flex-end" paddingX={1}>
        <LogOutButton className="nav-link" />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
