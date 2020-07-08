import { take, put, call, fork } from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import io from 'socket.io-client';

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

// inbound handles passing actions from the event channel to
// the sagas
function* inbound(socket) {
	const channel = yield call(subscribe, socket);
	while (true) {
		let action = yield take(channel);
		yield put(action);
	}
}

// outbound handles emission of sagas over the socket
function* outbound(socket) {
	while(true) {
		const message = yield take('SEND_MESSAGE');
		console.log("socket outbound:", message);
		socket.emit('message.send', message.payload)
	}
}

// subscribe creates an eventChannel, which dispatches reducer calls
// also acts as a buffer should there be a bunch of emissions from the server
function subscribe(socket) {
	return new eventChannel((dispatch) => {
		// message handlers
		// message refresh resets all messages
		socket.on("message.refresh", (messages) => {
			console.log(messages);
			dispatch({type: "SET_MESSAGES", payload: messages});
		})

		// message receive adds a new message to the stream
		socket.on("message.receive", (message) => {
			dispatch({type: "ADD_MESSAGE", payload: message});
		})

		// we need to return a unsubscriber function that handles any necessary cleanup
		// since we don't need any cleanup we just pass an empty function
		return () => {};
	})
}

//
export function* openSocket() {
	// begin upon receiving the OPEN_SOCKET dispatch
	yield take("OPEN_SOCKET");
	// get our socket from connect
	const socket = yield call(connect);
	// pass our socket to our inbound and outbound functions
	yield fork(inbound, socket);
	yield fork(outbound, socket);
}