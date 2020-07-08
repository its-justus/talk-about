/*
This module sets up our various socket handlers which call sagas or reducers. 
It is invoked whenever the socket is connected or reconnected to the server.
*/
export function socketConfig(socket, dispatch) {
	// set up our socket events
    // handle member refresh
    socket.on("member.refresh", (data) =>
      dispatch({ type: "SET_MEMBERS", payload: data })
    );
    // handle members joining or leaving the chat
    socket.on("member.joined", (data) =>
      dispatch({ type: "SET_MEMBERS", payload: data })
    );
    socket.on("member.left", (data) =>
      dispatch({ type: "SET_MEMBERS", payload: data })
		);
		
}