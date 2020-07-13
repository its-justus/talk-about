const membersReducer = (state = [], action) => {
	let newState = [...state];
	switch (action.type) {
    case 'SET_MEMBERS':
			return action.payload;
		case 'ADD_MEMBER':
			newState = [...newState, action.payload]
			return newState;
		case 'UPDATE_MEMBER':
			newState = [...state];
			const {index, updatedMember} = action.payload;  
			newState[index] = updatedMember;
			return newState;
    case 'RESET_MEMBERS':
      return [];
    default:
      return state;
  }
};

// members will be on the redux state at:
// state.members
export default membersReducer;