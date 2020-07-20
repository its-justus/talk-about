import React from "react";
import { connect } from "react-redux";
import {
  Box,
  TextField,
  withTheme,
  Divider,
  Typography,
} from "@material-ui/core";
import ChatStream from "../ChatStream/ChatStream";

class Chat extends React.Component {
  state = {
    count: 0,
    messageInput: "",
  };

  sendMessage = () => {
    this.props.dispatch({
      type: "SEND_MESSAGE",
      payload: {
        text: this.state.messageInput,
        room: this.props.currentRoom.id,
      },
    });
    this.setState({ messageInput: "" });
  };

  handleKeyPress = (event) => {
    if (this.state.messageInput.trim() === "") {
      // if the user pressed enter on an empty input ignore it
      this.setState({ messageInput: "" });
    } else if (event.key === "Enter" && !event.shiftKey) {
      this.sendMessage();
    }
  };

  render() {
    return (
      <Box height="100%">
        <Typography variant="h6">
          {`Room#${this.props.currentRoom.id} Topic: ${this.props.topic}`}
        </Typography>
        <Divider />
        <ChatStream />
        <Box height="113px">
          <TextField
            name="chat-input"
            required
            fullWidth
            multiline
            rows={4}
            rowsMax={4}
            type="text"
            variant="outlined"
            value={this.state.messageInput}
            onChange={(event) =>
              this.setState({ messageInput: event.target.value })
            }
            onKeyPress={this.handleKeyPress}
          />
        </Box>
      </Box>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  messages: state.histories[state.currentRoom.id],
  members: state.memberLists[state.currentRoom.id],
  topic: state.topics[state.currentRoom.topic_id],
  currentRoom: state.currentRoom,
});

// this allows us to use <App /> in index.js
export default withTheme(connect(mapStateToProps)(Chat));
