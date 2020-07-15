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
	let newState = {...state};
	switch (action.type) {
		case 'SET_HISTORIES':
			// action.payload = {roomID1: historyArray1, roomID2: historyArray2,...]
			newState = {...action.payload};
			return newState;
		case 'ADD_HISTORY':
			// action.payload = {roomID: integer, history:[historyArray]} 
			newState[action.payload.roomID] = action.payload.history;
			return newState;
		case 'ADD_MESSAGE':
			// action.payload = {messageObject}
			let history = newState[action.payload.room_id];
			newState[action.payload.room_id] = history.push(action.payload);
			return newState;
		case 'RESET_HISTORIES':
			return [];
		default:
			return state;
	}
}

export default historiesReducer;