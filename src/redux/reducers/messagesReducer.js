const messagesReducer = (state = [], action) => {
	let newState = [];
	switch (action.type) {
    case 'SET_MESSAGES':
			return action.payload;
		case 'ADD_MESSAGE':
			newState = [...state, action.payload]
			return newState;
		case 'UPDATE_MESSAGE':
			newState = [...state];
			// search through our current state for a message id matching our payload
			for(let index in newState) {
				if(newState[index].id === action.payload.id){
					// if we find it, swap in the new message and break the loop
					newState[index] = action.payload;
					break;
				}
			}
			return newState;
		case 'REMOVE_MESSAGE':
			console.log("removing message:", action.payload);
			newState = state.filter((cur) => cur.id !== action.payload)
			return newState;
    case 'RESET_MESSAGES':
      return [];
    default:
      return state;
  }
};

// messages will be on the redux state at:
// state.messages
export default messagesReducer;