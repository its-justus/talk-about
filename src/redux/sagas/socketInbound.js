import { eventChannel } from "redux-saga";
import { call, take, put } from "redux-saga/effects";

// messages channel returns
function socketChannel(socket) {
  return new eventChannel((dispatch) => {
    // message handlers
    // message refresh resets all messages
    socket.on("message.refresh", (data) => {
      console.log("Messages refreshed:", data);
      dispatch({ type: "SET_MESSAGES", payload: data.reverse() });
    });

    // message receive adds a new message to the stream
    socket.on("message.receive", (data) => {
      console.log("Message received:", data);
      dispatch({ type: "ADD_MESSAGE", payload: data });
    });

    // message update edits a certain message if it is already in the stream
    socket.on("message.update", (data) => {
      console.log("Message updated: ", data);
      dispatch({ type: "UPDATE_MESSAGE", payload: data });
    });

    // message remove removes a deleted message from the message reducer
    socket.on("message.remove", (data) => {
      console.log("Message removed:", data);
      dispatch({ type: "REMOVE_MESSAGE", payload: data });
    });

    // Member events

    // member refresh updates the member list
    socket.on("member.refresh", (data) => {
      console.log("Members refreshed", data);
      dispatch({ type: "SET_MEMBERS", payload: data });
    });

    // member.new is sent when a new member joins the room
    socket.on("member.new", (data) => {
      console.log("New member joined", data);
      dispatch({ type: "ADD_MEMBER", payload: data });
    });

    // Room Events

    // room refresh
    socket.on("room.refresh", (data) => {
      console.log("Rooms refreshed");
      dispatch({ type: "SET_ROOMS", payload: data });
    });

    // room joined
    socket.on("room.joined", (data) => {
      console.log("Joined room", data);
      // add our room to the rooms reducer
      dispatch({
        type: "ADD_ROOM",
        payload: {
          id: data.id,
          created_at: data.created_at,
          topic_id: data.topic_id,
        },
      });
      // add the room topic to the topics reducer
      dispatch({
        type: "ADD_TOPIC",
        payload: data.topic,
      });
      // add the room history to the histories reducer
      dispatch({
        type: "ADD_HISTORY",
        payload: { room: data.id, history: data.history },
      });
      // add the room members to the memberLists reducer
      dispatch({
        type: "ADD_MEMBER_LIST",
        payload: { room: data.id, members: data.members },
      });
    });

    // receive popular topics
    socket.on("topic.popularTopics", (data) => {
      console.log("Popular topics:", data);
    });

    // server letting us know our session is all ready
    socket.on("session.ready", (data) => {
      console.log("Session ready, hooray!");
      dispatch({ type: "SET_STATUS", payload: "OKAY" });
    });

    // we need to return a unsubscriber function that handles any necessary cleanup
    // since we don't need any cleanup we just pass an empty function
    return () => {};
  });
}

// inbound handles passing actions from the event channel to
// the sagas
export function* inbound(socket) {
  const channel = yield call(socketChannel, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
