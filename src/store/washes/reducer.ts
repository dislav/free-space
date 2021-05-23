import { combineReducers } from 'redux';
import { ReduxStatus, Wash } from '../../interfaces/types';

import {
  CREATE_WASH_FAILURE,
  CREATE_WASH_REQUEST,
  CREATE_WASH_SUCCESS,
  GET_WASHES_FAILURE,
  GET_WASHES_REQUEST,
  GET_WASHES_SUCCESS,
  WashesActionTypes,
  WashesState,
} from './types';

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

const initialState: WashesState = {
  washesStatus: {
    status: Status.Idle,
    error: null,
  },
  washes: [],
};

const washesStatus = (
  state = initialState.washesStatus,
  action: WashesActionTypes
): ReduxStatus => {
  switch (action.type) {
    case GET_WASHES_REQUEST || CREATE_WASH_REQUEST:
      return {
        ...state,
        status: Status.Loading,
      };
    case GET_WASHES_SUCCESS || CREATE_WASH_SUCCESS:
      return {
        ...state,
        status: Status.Succeeded,
      };
    case GET_WASHES_FAILURE || CREATE_WASH_FAILURE:
      return {
        status: Status.Failed,
        error: action.payload,
      };
    default:
      return state;
  }
};

const washes = (
  state = initialState.washes,
  action: WashesActionTypes
): Wash[] => {
  switch (action.type) {
    case GET_WASHES_SUCCESS:
      return action.payload;
    case CREATE_WASH_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const washesReducer = combineReducers({
  washesStatus,
  washes,
});
