const roomsReducer = (state = [], action) => {
	let newState = [...state];
	switch (action.type) {
		case 'SET_ROOMS':
			// set rooms expects an array of room objects
			newState = action.payload;
			console.log("SET ROOMS: ", newState);
			return newState;
		default:
			return state;
	}
}

export default roomsReducer;