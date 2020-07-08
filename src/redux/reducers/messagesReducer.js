const messagesReducer = (state = [], action) => {
	switch (action.type) {
    case 'SET_MESSAGES':
			return action.payload;
		case 'ADD_MESSAGE':
			const newState = [...state, action.payload]
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