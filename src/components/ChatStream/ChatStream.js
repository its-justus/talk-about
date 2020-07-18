import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import ChatMessage from "../ChatMessage/ChatMessage";

class ChatStream extends React.Component {

	containerStyle = {
		height: "600px",
		overflowY: "scroll",
		overflowAnchor: "none",
	};

  render() {
    return (
      <>
        {`Room#${this.props.currentRoom} Topic: ${this.props.topic}`}
        <div style={this.containerStyle}>
          {this.props.messages?.map((cur, i) => {
            return (
              <ChatMessage
                key={`message-${i}`}
                message={cur}
              />
            );
          })}
          {/* the div below is used for anchoring the chat at the bottom */}
          <div ref={(el) => (this.messagesEnd = el)}></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.histories[state.currentRoom],
	currentRoom: state.currentRoom,
	topic: state.topics[state.currentRoom],
});

export default connect(mapStateToProps)(ChatStream);
