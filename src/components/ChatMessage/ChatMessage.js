import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class ChatMessage extends React.Component {
  // props
  // id: id of the message
  // author: Username of the author
  // authorID: id of the author
  // text: actual contents of the message
  state = {
    editing: false,
    editInput: "",
  };

  deleteMessage = () => {
    this.props.dispatch({ type: "DELETE_MESSAGE", payload: this.props.id });
  };

  handleChange = (event) => {
    this.setState({ editInput: event.target.value });
  };

  save = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: "EDIT_MESSAGE",
      payload: { text: this.state.editInput, id: this.props.id },
		});
		this.toggleEditMode();
  };

  toggleEditMode = () => {
    if (this.state.editing === false) {
      this.setState({ editing: true, editInput: this.props.text });
    } else {
      this.setState({ editing: false, editInput: "" });
    }
  };

  render() {
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
            {this.props.author}: {this.props.text}
          </p>
        )}
        <button type="button" onClick={this.toggleEditMode}>
          Edit
        </button>
        <button type="button" onClick={this.deleteMessage}>
          X
        </button>
      </div>
    );
  }
}

export default connect()(ChatMessage);
