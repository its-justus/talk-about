const currentRoomReducer = (state = {}, action) => {
	let newState = {...state};
	switch (action.type) {
		case 'SET_CURRENT_ROOM':
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}