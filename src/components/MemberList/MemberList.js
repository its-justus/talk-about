import React from "react";
import { connect } from "react-redux";
import { Grid, Box, Hidden } from "@material-ui/core";

class MemberList extends React.Component {
  componentDidMount = () => {
    // pull some things from props
    const { socket, dispatch, members } = this.props;

    // set up our socket events
    // handle member refresh
    socket.on("member.refresh", (data) =>
      dispatch({ type: "SET_MEMBERS", payload: data })
    );
    // handle members joining or leaving the chat
    socket.on("member.joined", (data) =>
      dispatch({ type: "SET_MEMBERS", payload: data })
    );
    socket.on("member.left", (data) =>
      dispatch({ type: "SET_MEMBERS", payload: data })
		);
		
		// ask the server for our member data
    socket.emit("member.getAll");
  };

  render() {
    return (
      <div>
        Member List:
        {this.props.members?.map((cur, i) => (
          <p>{cur.name}</p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { members: state.members, socket: state.socket };
};

export default connect(mapStateToProps)(MemberList);
