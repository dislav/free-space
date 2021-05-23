import {
  CREATE_WASH_FAILURE,
  CREATE_WASH_REQUEST,
  CREATE_WASH_SUCCESS,
  GET_WASHES_FAILURE,
  GET_WASHES_REQUEST,
  GET_WASHES_SUCCESS,
  WashesActionTypes,
} from './types';
import { Wash } from '../../interfaces/types';

// Fetch washes
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

// Create wash
export const createWashRequest = (payload: FormData): WashesActionTypes => ({
  type: CREATE_WASH_REQUEST,
  payload,
});

export const createWashSuccess = (payload: Wash): WashesActionTypes => ({
  type: CREATE_WASH_SUCCESS,
  payload,
});

export const createWashFailure = (payload: string): WashesActionTypes => ({
  type: CREATE_WASH_FAILURE,
  payload,
});
