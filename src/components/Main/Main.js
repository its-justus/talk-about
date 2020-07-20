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
        <>
          <Box name="main-row" flexGrow={1}>
            <Box
              name="main-col"
              height="100%"
              maxHeight="100%"
              minHeight="100%"
            >
              <Box name="header" flexGrow={1}>
                <Nav />
              </Box>
              <Box
                name="body"
                display="flex"
                flexDirection="row"
                height="calc(100% - 25px)"
              >
                <Box
                  name="left"
                  width={200}
									padding={1}
									flexShrink={0}
                  bgcolor="background.default"
                  color="black.main"
                >
                  <TopicExplorer />
                </Box>
                <Box
                  name="center"
                  flex="1 1 auto"
                  padding={1}
                  bgcolor="background.default"
                  color="black.main"
                >
                  <Chat />
                </Box>
                <Box
                  name="right"
                  display="flex"
									width={200}
									flexShrink="0"
                  bgcolor="background.default"
                  color="black.main"
                >
                  <MemberList />
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      );
    }
  }
}

// {/* <Grid container spacing={0}>
//             <Grid item xs={12}>
//               <Nav />
//             </Grid>
//             <Grid item xs={12}>
//               <Hidden xsDown>
//                 <Grid item name="left-section">
//                   <Box
//                     width={200}
//                     height="100%"
//                     padding={1}
//                     bgcolor="primary.main"
//                     color="secondary.light"
//                   >
//                     <TopicExplorer />
//                   </Box>
//                 </Grid>
//               </Hidden>
//               <Grid item name="center-section" xs>
//                 <Chat />
//               </Grid>
//               <Hidden xsDown>
//                 <Grid item name="right-section"></Grid>
//               </Hidden>
//             </Grid>
//           </Grid> */}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  status: state.status,
});

export default connect(mapStateToProps)(Main);
