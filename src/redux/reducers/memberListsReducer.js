/**
 * the member lists reducer stores room member lists as arrays of member objects
 * 
 * memberObject are currently defined as:
 * {
 * 	id: integer,
 * 	username: string,
 * }
 * 
 * a member list is an array of memberObjects in alphabetical order by username
 * [{memberObject1}, {memberObject2}, ...]
 * 
 * member list for a room with an id of roomID are accessible by mapping the 
 * memberLists reducer to props and then referencing this.props.memberLists[roomID]
*/
const memberListsReducer = (state = {}, action) => {
	let newState = {...state};
	switch (action.type) {
		case 'SET_MEMBER_LISTS':
			// action.payload = {roomID1: memberListArray1, roomID2: memberListArray2, ...]
			newState = {...action.payload};
			return newState;
		case 'ADD_MEMBER_LIST':
			// action.payload = {room: integer, members:[memberListArray]} 
			newState[action.payload.room] = action.payload.members;
			return newState;
		case 'ADD_MEMBER_TO_ROOM':
			// action.payload = {room: integer, member: memberObject}
			let members = newState[action.payload.room];
			newState[action.payload.room] = members.push(action.payload.member);
			return newState;
		case 'RESET_MEMBER_LISTS':
			return {};
		default:
			return state;
	}
}

export default memberListsReducer