import { all } from 'redux-saga/effects';
import washesSaga from './washes/sagas';

export default function* rootSaga() {
  yield all([washesSaga()]);
}
