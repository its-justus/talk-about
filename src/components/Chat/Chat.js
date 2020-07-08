import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class Chat extends React.Component {
  state = {
    count: 0,
  };

  componentDidMount = () => {
    // here we set the socket to listen for relevant messages for this component
    this.props.socket.on("chat.count", (data) =>
      this.setState({ count: this.state.count + data })
    );
	};

  sendMessage = (event) => {
    console.log("sendMessage");
    event.preventDefault();
    this.props.socket.emit("message.new", this.state.messageInput);
    this.setState({ messageInput: "" });
  };

	// this is some hacky shit to keep the scroll at the bottom :)
	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({behavior: 'smooth'});
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

  render() {
    const containerStyle = {
      height: "400px",
      overflowY: "scroll",
      overflowAnchor: "none",
    };
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            time in chat: {this.state.count * 2 + " seconds" || "~"}
            <br />
            {/* Users:
            {this.state.users.map((cur) => (
              <p>{cur.name}</p>
            ))} */}
            <br />
          </Grid>
          <Grid item xs={9}>
            Messages:
            <div style={containerStyle}>
              {/* {this.state.messages.map((cur) => (
                <p>
                  {cur.author}: {cur.message}
                </p>
              ))} */}
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
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chat);
