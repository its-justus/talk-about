import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Hidden,
  Typography,
  withTheme,
  List,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";
import RoomListItem from "../RoomListItem/RoomListItem";
import RefreshIcon from "@material-ui/icons/Refresh";
import Divider from "@material-ui/core/Divider";

class TopicExplorer extends React.Component {
  state = {
    topicInput: "",
  };

  joinTopic = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "JOIN_TOPIC", payload: this.state.topicInput });
    this.setState({ topicInput: "" });
  };

  render() {
    return (
      <Box
        name="topic-explorer"
        display="flex"
        flexDirection="column"
        height="100%"
				maxHeight="100%"
				overflow="auto"
      >
        <Box
          bgcolor="primary.light"
          display="flex"
          flexDirection="column"
          flexShrink={1}
          padding={1}
          borderRadius={5}
          marginBottom={0.5}
        >
          <Typography variant="h6">{this.props.user.username}</Typography>
        </Box>
        <Box
          bgcolor="secondary.light"
          display="flex"
          flexDirection="column"
          flexShrink={1}
          padding={1}
          borderRadius={5}
          marginY={0.5}
        >
          <Typography variant="h6">Enter A Topic</Typography>
          <form onSubmit={this.joinTopic}>
            <TextField
              required
              fullWidth
              size="small"
              variant="outlined"
              minLength={3}
              type="text"
              value={this.state.topicInput}
              onChange={(event) =>
                this.setState({ topicInput: event.target.value })
              }
            />
          </form>
        </Box>
        <Box
          bgcolor="secondary.light"
          padding={1}
          borderRadius={5}
          marginY={0.5}
          display="flex"
          flexShrink={1}
          flexGrow={1}
          flexDirection="column"
          minHeight="200px"
        >
          <Box display="flex">
            <Box justifySelf="flex-start">
              <Typography variant="h6">Popular Topics</Typography>
            </Box>
            <Box justifySelf="flex-end">
              <IconButton
                type="button"
                color="primary"
                size="small"
                onClick={() =>
                  this.props.dispatch({ type: "REFRESH_POPULAR_TOPICS" })
                }
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            flexShrink={1}
            overflow="auto"
          >
            <List>
              {this.props.popularTopics?.map((cur, i) => (
                <li
                  onClick={() =>
                    this.props.dispatch({
                      type: "JOIN_TOPIC",
                      payload: cur.name,
                    })
                  }
                  key={`poptopic-${i}`}
                >
                  <Typography variant="body1">{cur.name}</Typography>
                </li>
              ))}
            </List>
          </Box>
        </Box>
        <Box
          bgcolor="secondary.light"
          padding={1}
          borderRadius={5}
          marginTop={0.5}
          display="flex"
          flexShrink={1}
          flexGrow={1}
          flexDirection="column"
          minHeight="150px"
        >
          <Typography variant="h6">My Rooms</Typography>
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            flexShrink={1}
            overflow="auto"
          >
            <List>
              {this.props.rooms?.map((cur, i) => (
                <RoomListItem key={`room-${i}`} room={cur} />
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
    rooms: state.rooms,
    popularTopics: state.popularTopics,
    user: state.user,
  };
};

export default withTheme(connect(mapStateToProps)(TopicExplorer));
