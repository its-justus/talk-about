import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Hidden,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";

class ChatMessage extends React.Component {
  state = {
    editing: false,
    editInput: "",
  };

  deleteMessage = () => {
    this.props.dispatch({
      type: "DELETE_MESSAGE",
      payload: this.props.message.id,
    });
  };

  handleChange = (event) => {
    this.setState({ editInput: event.target.value });
  };

  save = (event) => {
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

  handleKeyPress = (event) => {
    // if user presses enter we send the message, shift ignores this
    if (event.key === "Enter" && !event.shiftKey) {
      this.save();
    }
  };

  render() {
    const { author_id, text } = this.props.message;
    const author = this.props.members.find((cur) => cur.id === author_id)
      .username;
    return (
      <Box
        name="message-container"
        width="100%"
        maxWidth="100%"
        display="flex"
        flexDirection="column"
      >
        <Box paddingY={1} paddingX={2}>
          <Divider variant="middle" />
        </Box>
        <Box
          name="message-header"
          paddingX={2}
          display="flex"
          flexDirection="row"
          onBlur={() => this.setState({ editing: false })}
        >
          <Box flexGrow={1} name="author">
            <Typography variant="h6" color="secondary.main">
              {author}
            </Typography>
          </Box>
          <Box name="options">
            {!this.state.editing && (
              <>
                <button type="button" onClick={this.toggleEditMode}>
                  Edit
                </button>
                <button
                  type="button"
                  display="inline"
                  onClick={this.deleteMessage}
                >
                  X
                </button>
              </>
            )}
            {this.state.editing && (
              <>
                <button type="button" onClick={this.toggleEditMode}>
                  Cancel
                </button>
                <button type="button" onClick={this.save}>
                  Save
                </button>
              </>
            )}
          </Box>
        </Box>
        <Box name="message-body" paddingX={3}>
          {!this.state.editing && <Typography>{text}</Typography>}
          {this.state.editing && (
            <TextField
              name="chat-input"
              required
              fullWidth
              multiline
              rows={3}
              rowsMax={3}
              type="text"
              variant="filled"
              value={this.state.editInput}
              onChange={(event) =>
                this.setState({ editInput: event.target.value })
              }
              onKeyPress={this.handleKeyPress}
            />
          )}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    members: state.memberLists[state.currentRoom.id],
  };
};

export default connect(mapStateToProps)(ChatMessage);
