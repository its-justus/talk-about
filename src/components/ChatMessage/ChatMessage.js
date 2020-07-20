import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Divider,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";

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
                <IconButton
                  type="button"
                  color="primary"
                  size="small"
                  onClick={this.toggleEditMode}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  type="button"
                  color="primary"
                  size="small"
                  onClick={this.deleteMessage}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
            {this.state.editing && (
              <>
                <IconButton
                  type="button"
                  color="primary"
                  size="small"
                  onClick={this.toggleEditMode}
                >
                  <CancelIcon />
                </IconButton>
                <IconButton
                  type="button"
                  color="primary"
                  size="small"
                  onClick={this.save}
                >
                  <SaveIcon />
                </IconButton>
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
