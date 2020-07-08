import { put, takeLatest } from 'redux-saga/effects';
import io from 'socket.io-client';

function* connectSocket(action) {
	try{
		console.log();
		const socket = yield io("http://localhost:5000");
		yield put({type: "SET_SOCKET", payload: socket });
	}
	catch (error) {
		console.log("connectSocket error", error);
	}
}

function* disconnectSocket() {
	try{
		yield put({type: "RESET_SOCKET"});
	}
	catch (error) {
		console.log("disconnectSocket error", error);
	}
}

function* socketSaga() {
  yield takeLatest('CONNECT_SOCKET', connectSocket);
  yield takeLatest('DISCONNECT_SOCKET', disconnectSocket);
}

export default socketSaga;