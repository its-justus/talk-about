const messagesReducer = (state = [], action) => {
	let newState = [];
	switch (action.type) {
    case 'SET_MESSAGES':
			return action.payload;
		case 'ADD_MESSAGE':
			newState = [...state, action.payload]
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