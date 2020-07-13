import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class MemberList extends React.Component {
	select = () => {
		this.props.dispatch({type: "SELECT_CURRENT_ROOM", payload: this.props.room.id})
	}

  render() {
    return (
      <div>
        <p onClick={this.select}>{this.props.room.topic}</p>
      </div>
    );
  }
}

export default connect()(MemberList);
