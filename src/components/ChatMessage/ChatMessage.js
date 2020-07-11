import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class ChatMessage extends React.Component {
	// props
	// id: id of the message
	// author: Username of the author
	// authorID: id of the author
	// text: actual contents of the message

	delete = () => {
		this.props.dispatch({type: "DELETE_MESSAGE", payload: this.props.id})
	}

	render() {
		return (
			<div>
				{this.props.author}: {this.props.text}
				<button type="button" onClick={this.delete}>X</button>
			</div>
		)
	}
}

export default connect()(ChatMessage);