const statusReducer = (state = "STARTING", action) => {
  let newState = state.slice(0);
  switch (action.type) {
    case "SET_STATUS":
      newState = action.payload.slice(0);
      return newState;
    default:
      return newState;
  }
};

export default statusReducer;
