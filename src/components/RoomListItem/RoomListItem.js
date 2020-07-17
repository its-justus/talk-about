import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class RoomListItem extends React.Component {
  select = () => {
    this.props.dispatch({
      type: "SET_CURRENT_ROOM",
      payload: this.props.room.id,
    });
  };

  render() {
    return (
      <li onClick={this.select} style={{}}>
        {this.props.topics[this.props.room.topic_id]}#{this.props.room.id}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
  };
};

export default connect(mapStateToProps)(RoomListItem);
