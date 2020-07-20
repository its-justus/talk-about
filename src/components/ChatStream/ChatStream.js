import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import ChatMessage from "../ChatMessage/ChatMessage";

class ChatStream extends React.Component {
	state = {
		atBottom: true,
	}

	// this is some hacky shit to keep the scroll at the bottom :)
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  };

  componentDidUpdate() {
		if(this.state.atBottom){
			this.scrollToBottom();
		}
	}
	
	handleScroll = (event) => {
		const {scrollHeight, clientHeight, scrollTop} = event.target;
		if(clientHeight + scrollTop !== scrollHeight) {
			this.setState({atBottom: false});
		} else {
			this.setState({atBottom: true});
		}
	}

  render() {
    return (
      <Box
					name="chat-stream"
          height="calc(100% - 146px)"
          flexShrink={1}
          flexDirection="column"
					overflow="scroll"
					onScroll={this.handleScroll}
        >
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
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.histories[state.currentRoom.id],
	currentRoom: state.currentRoom,
	topic: state.topics[state.currentRoom.topic_id],
});

export default connect(mapStateToProps)(ChatStream);
