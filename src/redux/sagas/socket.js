import { take, put, call, fork } from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import io from 'socket.io-client';
import {inbound} from "./socketInbound";
import {outbound} from "./socketOutbound";

// connect establishes the socket connection with the server
function connect() {
	const socket = io('http://localhost:5000/');
	
	// return a promise that automatically resolves once the socket
	// connection is established
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

//
export function* openSocket() {
	// begin upon receiving the OPEN_SOCKET dispatch
	yield take("OPEN_SOCKET");
	// get our socket from connect
	const socket = yield call(connect);
	// pass our socket to our inbound and outbound sagas
	yield fork(inbound, socket);
	yield fork(outbound, socket);
}