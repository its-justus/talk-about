import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import { Typography, Grid, AppBar, Toolbar} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  nav: {
    width: "100%",
  }
}));

const Nav = (props) => { 
  
  const classes = useStyles();

  return (

//  <AppBar position="relative" className={classes.nav}>
//    <Toolbar className={classes.nav}>
//        {/* <CameraIcon className={classes.icon} /> */}
//       <Grid item justify="flex-start">
//         <Typography variant="overline" color="secondary">
//           TalkAbout
//         </Typography>
//       </Grid>
//       <Box display="flex" flexDirection="row-reverse">
//           <LogOutButton className="nav-link" />
//           <Link className="nav-link" to="/about">
//             About
//           </Link>
//         </Box>
//     </Toolbar>
//  </AppBar>

  <Box bgcolor="primary.main" className={classes.nav}>
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
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
