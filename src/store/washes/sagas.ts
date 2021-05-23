import { put, call, takeEvery } from 'redux-saga/effects';
import { createWash, fetchWashes } from '../../lib/api';
import { CREATE_WASH_REQUEST, GET_WASHES_REQUEST } from './types';
import { ActionSaga, Response, Wash } from '../../interfaces/types';
import {
  createWashFailure,
  createWashSuccess,
  getWashesFailure,
  getWashesSuccess,
} from './actions';
import { AxiosResponse } from 'axios';

function* getWashes() {
  try {
    const { data }: AxiosResponse<Response<Wash[]>> = yield call(fetchWashes);
    if (!data.status) new Error(data.message);

    yield put(getWashesSuccess(data.data));
  } catch (e) {
    yield put(getWashesFailure(e.message));
  }
}

function* createWashAsync(action: ActionSaga<FormData>) {
  try {
    const { data }: AxiosResponse<Response<Wash>> = yield call(
      createWash,
      action.payload
    );
    if (!data.status) throw new Error(data.message);

    yield put(createWashSuccess(data.data));
  } catch (e) {
    yield put(createWashFailure(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_WASHES_REQUEST, getWashes);
  yield takeEvery(CREATE_WASH_REQUEST, createWashAsync);
}
