import {eventChannel} from 'redux-saga';
import {call, take, put} from 'redux-saga/effects';

// messages channel returns
function socketChannel(socket) {
	return new eventChannel((dispatch) => {
		// message handlers
		// message refresh resets all messages
		socket.on("message.refresh", (data) => {
			console.log("Messages refreshed:", data);
			dispatch({type: "SET_MESSAGES", payload: data.reverse()});
		})

		// message receive adds a new message to the stream
		socket.on("message.receive", (data) => {
			console.log("Message received:", data);
			dispatch({type: "ADD_MESSAGE", payload: data});
		})

		// we need to return a unsubscriber function that handles any necessary cleanup
		// since we don't need any cleanup we just pass an empty function
		return () => {};
	})
}

// inbound handles passing actions from the event channel to
// the sagas
export function* inbound(socket) {
	const channel = yield call(socketChannel, socket);
	while (true) {
		let action = yield take(channel);
		yield put(action);
	}
}