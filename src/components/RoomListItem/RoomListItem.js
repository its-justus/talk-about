import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class MemberList extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.room.topic}</p>
      </div>
    );
  }
}

export default connect()(MemberList);
