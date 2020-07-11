import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class MemberList extends React.Component {
  render() {
    return (
      <div>
        Member List:
        {this.props.members?.map((cur, i) => (
          <p>{cur.username}</p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { members: state.members };
};

export default connect(mapStateToProps)(MemberList);
