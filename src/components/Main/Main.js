import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import Chat from "../Chat/Chat";
import MemberList from "../MemberList/MemberList";

class Main extends React.Component {
	componentDidMount = () => {
		this.props.start();
	}

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
					<Box width={200}>
						<MemberList />
					</Box>
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

// we can map our dispatch to props as well, defining individual dispatch functions
const mapDispatchToProps = (dispatch) => ({
	start: () => dispatch({type: "OPEN_SOCKET"})
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
