import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class ChatMessage extends React.Component {
  state = {
    editing: false,
    editInput: "",
  };

  deleteMessage = () => {
    this.props.dispatch({ type: "DELETE_MESSAGE", payload: this.props.message.id });
  };

  handleChange = (event) => {
    this.setState({ editInput: event.target.value });
  };

  save = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: "EDIT_MESSAGE",
      payload: { text: this.state.editInput, id: this.props.message.id },
    });
    this.toggleEditMode();
  };

  toggleEditMode = () => {
    if (this.state.editing === false) {
      this.setState({ editing: true, editInput: this.props.message.text });
    } else {
      this.setState({ editing: false, editInput: "" });
    }
  };

  render() {
		const { author_id, text } = this.props.message;
		const author = this.props.members.find((cur) => cur.id === author_id).username;
    return (
      <div>
        {this.state.editing ? (
          <form onSubmit={this.save}>
            <input
              type="text"
              value={this.state.editInput}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.cancelEdit}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </form>
        ) : (
          <p>
            {author}: {text}
          </p>
        )}
        {this.props.user.id === author_id && (
          <>
            <button type="button" onClick={this.toggleEditMode}>
              Edit
            </button>
            <button type="button" onClick={this.deleteMessage}>
              X
            </button>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
		user: state.user,
		members: state.memberLists[state.currentRoom]
	};
};

export default connect(mapStateToProps)(ChatMessage);
