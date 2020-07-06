import React from "react";
import { connect } from "react-redux";

class Main extends React.Component {
  render() {
    return (
      <div>
        Chatroom
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Main);
