import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* refreshTopics(action) {
  try {
		console.log("refreshTopics");
		const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/topic', config);
    yield put({type: "SET_POPULAR_TOPICS", payload: response.data})
  } catch (error) {
    console.log('Error with refresh topics:', error);
  }
}

function* topicsSaga() {
  yield takeLatest('REFRESH_POPULAR_TOPICS', refreshTopics);
}

export default topicsSaga;