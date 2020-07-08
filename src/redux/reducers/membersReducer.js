const membersReducer = (state = [], action) => {
	switch (action.type) {
    case 'SET_MEMBERS':
			return action.payload;
		case 'UPDATE_MEMBER':
			let newState = [...state];
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