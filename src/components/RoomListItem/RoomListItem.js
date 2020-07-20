import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden, Typography } from "@material-ui/core";

class RoomListItem extends React.Component {
  select = () => {
    this.props.dispatch({
      type: "SET_CURRENT_ROOM",
      payload: this.props.room,
    });
  };

  render() {
    return (
      <li onClick={this.select} style={{}}>
				<Typography variant="body1">
				{this.props.topics[this.props.room.topic_id]}#{this.props.room.id}
				</Typography>
        
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
