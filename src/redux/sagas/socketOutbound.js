import {takeEvery} from 'redux-saga/effects';
// outbound handles emission of sagas over the socket


function sendMessage(socket, action) {
	try {
    console.log("send message:", action);
		socket.emit('message.send', action.payload)
  } catch (error) {
    console.log('send message error:', error);
  }
}

// export our outbound sagas for use in our main socket saga
export function* outbound(socket) {
	yield takeEvery("SEND_MESSAGE", sendMessage, socket);
}