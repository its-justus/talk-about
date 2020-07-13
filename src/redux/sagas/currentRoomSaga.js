import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* selectCurrentRoom(action) {
	try {
		yield put({type: "SET_CURRENT_ROOM"})
	} catch (error) {

	}
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;