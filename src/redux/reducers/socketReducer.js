import io from "socket.io-client";

const socketReducer = (state = null, action) => {
	switch (action.type) {
    case 'SET_SOCKET':
			// expects action.payload to be a socket
      return action.payload;
    case 'RESET_SOCKET':
      return null;
    default:
      return state;
  }
}

export default socketReducer;