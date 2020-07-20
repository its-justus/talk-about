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

function disconnect(socket) {
	socket.close();
}

//
export function* openSocket() {
	// begin upon receiving the OPEN_SOCKET dispatch
	while(true){
  yield take("OPEN_SOCKET");
  // get our socket from connect
  const socket = yield call(connect);

  // pass our socket to our inbound and outbound sagas
  yield fork(inbound, socket);
	yield fork(outbound, socket);
	
	// start our session with the server
	yield put({type: "SESSION_START"});
	// request popular topics
	yield put({type: "REFRESH_POPULAR_TOPICS"})
	
	// pass our disconnect saga
	yield takeLeading("CLOSE_SOCKET", disconnect, socket);
	}
}
