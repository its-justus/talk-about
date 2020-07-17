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
        <Grid container>
          <Grid item name="user-data" xs={12}>
            <Typography variant="h6">{this.props.user.username}</Typography>
          </Grid>
          <Grid item name="enter-topic" xs={12}>
            <Box borderColor="primary.dark" marginY={2}>
              Enter topic
              <form onSubmit={this.joinTopic}>
                <input
                  required
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
            <Box marginY={2}>
              Topics
              <Button
                type="button"
                color="secondary"
                onClick={() =>
                  this.props.dispatch({ type: "REFRESH_POPULAR_TOPICS" })
                }
              >
                Refresh
              </Button>
              <List style={{ maxHeight: 200, width: "100%", overflow: "auto" }}>
                {this.props.popularTopics?.map((cur, i) => (
                  <li
                    onClick={() => this.props.dispatch({
                      type: "JOIN_TOPIC",
                      payload: cur.name,
                    })}
                    key={`poptopic-${i}`}
                  >
                    {cur.name}
                  </li>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item name="user-rooms" xs={12}>
            <Box marginY={2}>
              My Rooms
              <List style={{ maxHeight: 200, width: "100%", overflow: "auto" }}>
                {this.props.rooms?.map((cur, i) => (
                  <RoomListItem key={`room-${i}`} room={cur} />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
      //   {/* Topics:
      //   <button
      //     type="button"
      //     onClick={() =>
      //       this.props.dispatch({ type: "REFRESH_POPULAR_TOPICS" })
      //     }
      //   >
      //     Refresh
      //   </button>
      //   {this.props.popularTopics?.map((cur, i) => (
      //     <p key={`poptopic-${i}`}>{cur.name}</p>
      //   ))}
      //   My Rooms:
      //   {this.props.rooms?.map((cur, i) => (
      //     <RoomListItem key={`room-${i}`} room={cur} />
      //   ))}
      // </div> */}
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
