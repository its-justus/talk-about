import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import ChatMessage from "../ChatMessage/ChatMessage";

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
      payload: this.state.messageInput,
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
    const containerStyle = {
      height: "400px",
      overflowY: "scroll",
      overflowAnchor: "none",
    };
    return (
      <div>
        <Grid container>
          <Grid item xs={9}>
            Messages:
            <div style={containerStyle}>
              {this.props.messages?.map((cur, i) => {
                let author;
                const { members } = this.props;
                for (let index in members) {
                  if (cur.author_id === members[index].id) {
                    author = members[index].username;
                    break;
                  }
                }
                return (
                  <ChatMessage
                    key={`message-${i}`}
                    author={author}
                    authorID={cur.author_id}
                    text={cur.text}
                  />
                );
              })}
              {/* the div below is used for anchoring the chat at the bottom */}
              <div ref={(el) => (this.messagesEnd = el)}></div>
            </div>
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
  socket: state.socket,
  user: state.user,
  messages: state.messages,
  members: state.members,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chat);
