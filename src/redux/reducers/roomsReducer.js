/**
 * the rooms reducer stores data for each room the user is an active member of.
 * 
 * A roomObject is currently defined as:
 * {
 * 	id: integer, 
 * 	created_at: ISO8601 date, 
 * 	topic_id: integer
 * }
*/
const roomsReducer = (state = [], action) => {
	let newState = [...state];
	switch (action.type) {
		case 'SET_ROOMS':
			// action.payload = [{roomObject1}, {roomObject2},...]
			newState = [...action.payload];
			return newState;
		case 'ADD_ROOM':
			// action.payload = {roomObject} 
			newState = [...newState, action.payload];
			return newState;
		case 'RESET_ROOMS':
			return [];
		default:
			return state;
	}
}

export default roomsReducer;