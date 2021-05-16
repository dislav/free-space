import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchWashes } from '../../lib/api';
import { GET_WASHES_REQUEST } from './types';
import { Response, Wash } from '../../interfaces/types';
import { getWashesFailure, getWashesSuccess } from './actions';
import { AxiosResponse } from 'axios';

function* getWashes() {
  try {
    const { data }: AxiosResponse<Response<Wash[]>> = yield call(fetchWashes);
    if (!data.status) throw new Error(data.message);

    yield put(getWashesSuccess(data.data));
  } catch (e) {
    yield put(getWashesFailure(e.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_WASHES_REQUEST, getWashes);
}
