import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class TopicExplorer extends React.Component {
  render() {
    return (
      <div>
        Topics:
        {this.props.topics?.map((cur, i) => (
          <p key={`topic-${i}`}>{cur.name}</p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { topics: state.topics };
};

export default connect(mapStateToProps)(TopicExplorer);