import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatStream from "../ChatStream/ChatStream";

class Chat extends React.Component {
  state = {
    count: 0,
    messageInput: "",
  };

  componentDidMount = () => {
    console.log("Chat.componentDidMount");
  };

  sendMessage = (event) => {
    console.log("sendMessage");
    event.preventDefault();
    this.props.dispatch({
      type: "SEND_MESSAGE",
      payload: {text: this.state.messageInput, room: this.props.currentRoom},
    });
    	this.setState({ messageInput: "" });
  };

  // // this is some hacky shit to keep the scroll at the bottom :)
  // scrollToBottom = () => {
  // 	this.messagesEnd.scrollIntoView({behavior: 'smooth'});
  // }

  // componentDidUpdate() {
  // 	this.scrollToBottom();
  // }

  render() {
    
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
						<ChatStream />
            <br />
            <form onSubmit={this.sendMessage}>
              <input
                required
                width="100%"
                name="messageInput"
                type="text"
                value={this.state.messageInput}
                onChange={(event) =>
                  this.setState({ messageInput: event.target.value })
                }
              />
            </form>
          </Grid>
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
  messages: state.histories[state.currentRoom],
	members: state.memberLists[state.currentRoom],
	currentRoom: state.currentRoom,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chat);
