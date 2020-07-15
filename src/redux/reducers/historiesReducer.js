/**
 * the histories reducer stores room chat histories as arrays of message objects
 *
 * A messageObject is currently defined as:
 * {
 * 	id: integer,
 * 	author_id: integer,
 * 	room_id: integer,
 * 	text: string,
 * 	created_at: ISO8601 date,
 * }
 *
 * A history array is an array of messageObjects stored in chronological order so the
 * LAST object in the array is the most RECENT message.
 * [messageObject1, messageObject2, ...]
 *
 * The history for a room with id roomID can be found by mapping the histories store
 * to props and referencing this.props.histories[roomID].
 */
const historiesReducer = (state = {}, action) => {
	let newState = { ...state };
	let history;
  switch (action.type) {
    case "SET_HISTORIES":
      // action.payload = {roomID1: historyArray1, roomID2: historyArray2, ...}
      newState = { ...action.payload };
      return newState;
    case "ADD_HISTORY":
      // action.payload = {roomID: integer, history:[historyArray]}
      newState[action.payload.roomID] = [...action.payload.history.reverse()];
      return newState;
    case "ADD_MESSAGE":
      // action.payload = {messageObject}
			history = [...newState[action.payload.room_id]];
			history.push(action.payload)
      newState[action.payload.room_id] = history;
      return newState;
    case "UPDATE_MESSAGE":
			// action.payload = {messageObject}
			// get the history for the room the message is in
			history = [...newState[action.payload.room_id]];
      // search through our current history newest to oldest for a message id matching our payload
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].id === action.payload.id) {
          // if we find it, swap in the new message and break the loop
					history[i] = {...action.payload};
					// put our new history back into our histories
					newState[action.payload.room_id] = history;
          break;
        }
			}
      return newState;
    case "REMOVE_MESSAGE":
			// action.payload = {messageObject}
			// get the history for the message the room is in
			history = [...newState[action.payload.room_id]]; 
			// remove the message from that history
			history = history.filter((cur) => cur.id !== action.payload.id);
			// put the altered history back into our histories
			newState[action.payload.room_id] = history;
      return newState;
    case "RESET_HISTORIES":
      return [];
    default:
      return state;
  }
};

export default historiesReducer;
