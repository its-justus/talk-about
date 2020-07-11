import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class ChatMessage extends React.Component {
	// props
	// author: Username of the author
	// authorID: id of the author
	// text: actual contents of the message

	render() {
		return (
			<div>
				{this.props.author}: {this.props.text}
			</div>
		)
	}
}

export default connect()(ChatMessage);