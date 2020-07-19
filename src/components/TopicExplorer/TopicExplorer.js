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
      <Box style={{ maxHeight: "100%", overflow: "auto" }}>
        <Grid container spacing={1}>
          <Grid item name="user-data" xs={12}>
            <Box bgcolor="primary.light" padding={1} borderRadius={5}>
              <Typography variant="h6">{this.props.user.username}</Typography>
            </Box>
          </Grid>
          <Grid item name="enter-topic" xs={12}>
            <Box bgcolor="secondary.light" padding={1} borderRadius={5}>
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
          </Grid>
          <Grid item name="popular-topics" xs={12}>
            <Box bgcolor="secondary.light" padding={1} borderRadius={5}>
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
              <List style={{ maxHeight: 200, width: "100%", overflow: "auto" }}>
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
                    {cur.name}
                  </li>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item name="user-rooms" xs={12}>
            <Box bgcolor="secondary.light" padding={1} borderRadius={5}>
              <Typography variant="h6">My Rooms</Typography>
              <List style={{ maxHeight: 200, width: "100%", overflow: "auto" }}>
                {this.props.rooms?.map((cur, i) => (
                  <RoomListItem key={`room-${i}`} room={cur} />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
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
