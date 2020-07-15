import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";
import RoomListItem from "../RoomListItem/RoomListItem";

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
      <div>
        Enter topic:
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
        Topics:
        <button
          type="button"
          onClick={() => this.props.dispatch({ type: "REFRESH_POPULAR_TOPICS" })}
        >
          Refresh
        </button>
        {this.props.popularTopics?.map((cur, i) => (
          <p key={`poptopic-${i}`}>{cur.name}</p>
        ))}
        My Rooms:
        {this.props.rooms?.map((cur, i) => (
          <RoomListItem key={`room-${i}`} room={cur} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
    rooms: state.rooms,
    popularTopics: state.popularTopics,
  };
};

export default connect(mapStateToProps)(TopicExplorer);
