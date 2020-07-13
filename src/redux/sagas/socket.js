import { take, call, fork, put, takeLatest, takeLeading } from "redux-saga/effects";
import io from "socket.io-client";
import { inbound } from "./socketInbound";
import { outbound } from "./socketOutbound";

// connect establishes the socket connection with the server
function connect() {
  // create our socket
  const socket = io("http://localhost:5000/");

  // return a promise that automatically resolves once the socket
  // connection is established
  return new Promise((resolve) => {
    socket.on("connect", () => {
			resolve(socket);
    });
  });
}

function disconnect(arg) {
	console.log("Closing socket");
	clearInterval(arg.heartbeat)
	arg.socket.close();
}

//
export function* openSocket() {
	// begin upon receiving the OPEN_SOCKET dispatch
	while(true){
  yield take("OPEN_SOCKET");
	console.log("opening socket");
  // get our socket from connect
  const socket = yield call(connect);

  // pass our socket to our inbound and outbound sagas
  yield fork(inbound, socket);
	yield fork(outbound, socket);
	
	// get user's rooms
	yield put({type: "GET_ROOMS"});
	// get members for current room
	yield put({type: "GET_MEMBERS"});
	// get messages for current room
	yield put({type: "GET_MESSAGES"});
	// set up a heartbeat to keep the socket open
	const heartbeat = setInterval(() => {
		socket.emit('heartbeat');
	}, 19*1000); 
	// pass our disconnect saga
	yield takeLeading("CLOSE_SOCKET", disconnect, {socket, heartbeat});
	}
}
