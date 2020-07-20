const currentRoomReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_CURRENT_ROOM":
      newState = action.payload;
      return newState;
    case "RESET_CURRENT_ROOM":
      return {};
    default:
      return state;
  }
};

export default currentRoomReducer;
