import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class TopicExplorer extends React.Component {
  state = {
    topicInput: "",
	};
	
	joinTopic = (event) => {
		event.preventDefault();
		this.props.dispatch({type: "JOIN_TOPIC", payload: this.state.topicInput});
	}

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
          onClick={() => this.props.dispatch({ type: "REFRESH_TOPICS" })}
        >
          Refresh
        </button>
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
