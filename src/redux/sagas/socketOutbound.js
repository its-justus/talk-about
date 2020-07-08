import {take} from 'redux-saga/effects';
// outbound handles emission of sagas over the socket
export function* outbound(socket) {
	while(true) {
		const message = yield take('SEND_MESSAGE');
		console.log("socket outbound:", message);
		socket.emit('message.send', message.payload)
	}
}