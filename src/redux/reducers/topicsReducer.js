const topicsReducer = (state = [], action) => {
	switch (action.type) {
    case 'SET_TOPICS':
			return action.payload;
    case 'RESET_TOPICS':
      return [];
    default:
      return state;
  }
};

// topics will be on the redux state at:
// state.topics
export default topicsReducer;