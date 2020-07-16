import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import ChatMessage from "../ChatMessage/ChatMessage";

class ChatStream extends React.Component() {

	render() {
		return (
			
		)
	}
}

const mapStateToProps = (state) => ({
  user: state.user,
  messages: state.histories[state.currentRoom],
	currentRoom: state.currentRoom,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chat);