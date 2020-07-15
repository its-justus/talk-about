/**
 * The topics reducer is currently just a way to get a topics proper name
 * based on a topic id that might live in another object. 
 * Referencing a topic should be done by mapping the reducer to props and then
 * referencing this.props.topics[topicID]. This will give the name of the topic. 
 * 
 * Expected action data structures are included in each case.
 */
const topicsReducer = (state = {}, action) => {
	let newState = {...state};
	switch (action.type) {
    case 'SET_TOPICS':
			// action.payload = {topic.id1: topic.name1, topic.id2: topic.name2...}
			return {...action.payload};
		case 'ADD_TOPIC':
			// action.payload = {id: topic.id, name: topic.name}
			newState[action.payload.id] = action.payload.name;
			return newState;
    case 'RESET_TOPICS':
			// action.payload = N/A
      return {};
    default:
      return state;
  }
};

export default topicsReducer;