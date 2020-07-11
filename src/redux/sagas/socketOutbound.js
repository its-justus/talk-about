import {takeEvery, takeLatest} from 'redux-saga/effects';
// outbound handles emission of sagas over the socket

// handles sending messages to the server
function sendMessage(socket, action) {
	try {
		console.log("send message:", action);
		// action.payload is expected to be a simple text message, 
		socket.emit('message.send', action.payload)
  } catch (error) {
    console.log('send message error:', error);
  }
}

function deleteMessage(socket, action) {
	try {
		console.log("delete message:", action);
		// action.payload is expected to be a simple text message, 
		socket.emit('message.delete', action.payload)
  } catch (error) {
    console.log('delete message error:', error);
  }
}

function getMessages(socket, action) {
	try {
		console.log("get messages:", action);
		// action.payload is expected to be a simple text message, 
		socket.emit('message.getMessages', action.payload)
  } catch (error) {
    console.log('get messages error:', error);
  }
}

function getMembers(socket, action) {
	try {
		console.log("get members:", action);
		// action.payload is expected to be a simple text message, 
		socket.emit('member.getMembers', action.payload)
  } catch (error) {
    console.log('get room members error:', error);
  }
}

// export our outbound sagas for use in our main socket saga
export function* outbound(socket) {
	yield takeEvery("SEND_MESSAGE", sendMessage, socket);
	yield takeEvery("GET_MESSAGES", getMessages, socket);
	yield takeEvery("GET_MEMBERS", getMembers, socket);
	yield takeEvery("DELETE_MESSAGE", deleteMessage, socket)
}