import {
  GET_WASHES_FAILURE,
  GET_WASHES_REQUEST,
  GET_WASHES_SUCCESS,
  WashesActionTypes,
  WashesState,
} from './types';

const initialState: WashesState = {
  status: 'idle',
  error: null,
  washes: [],
};

export const washesReducer = (
  state = initialState,
  action: WashesActionTypes
): WashesState => {
  switch (action.type) {
    case GET_WASHES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case GET_WASHES_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        washes: action.payload,
      };
    case GET_WASHES_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};
