import { call, put } from 'redux-saga/effects';
import { TIME_AWAIT, TIME_SUCCESS, TIME_FAILED } from '../constants';

const timeFn = () => new Promise(
  (resolve) => setTimeout(
    () => resolve(Date.now()),
    700
  )
);

function* fetchTime() {
  try {
    const time = yield call(timeFn);
    yield put({ type: TIME_SUCCESS, time });
  } catch (e) {
    yield put({ type: TIME_FAILED });
  }
}

export default {
  action: TIME_AWAIT,
  saga: fetchTime
}
