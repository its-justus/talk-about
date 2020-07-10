import {takeEvery} from 'redux-saga/effects';
// outbound handles emission of sagas over the socket

// handles sending messages to the server
function* sendMessage(socket, action) {
	try {
		console.log("send message:", action);
		// action.payload is expected to be a simple text message, 
		socket.emit('message.send', action.payload)
  } catch (error) {
    console.log('send message error:', error);
  }
}

function* getMessages(socket, action) {
	try {
		console.log("send message:", action);
		// action.payload is expected to be a simple text message, 
		socket.emit('message.getMessages', action.payload)
  } catch (error) {
    console.log('send message error:', error);
  }
}

// export our outbound sagas for use in our main socket saga
export function* outbound(socket) {
	yield takeEvery("SEND_MESSAGE", sendMessage, socket);
	yield takeEvery("GET_MESSAGES", getMessages, socket);
}