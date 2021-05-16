import {
  GET_WASHES_FAILURE,
  GET_WASHES_REQUEST,
  GET_WASHES_SUCCESS,
  WashesActionTypes,
} from './types';
import { Wash } from '../../interfaces/types';

export const getWashesRequest = (): WashesActionTypes => ({
  type: GET_WASHES_REQUEST,
});

export const getWashesSuccess = (payload: Wash[]): WashesActionTypes => ({
  type: GET_WASHES_SUCCESS,
  payload,
});

export const getWashesFailure = (payload: string): WashesActionTypes => ({
  type: GET_WASHES_FAILURE,
  payload,
});
