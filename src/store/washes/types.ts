import { ReduxStatus, Wash } from '../../interfaces/types';

export const GET_WASHES_REQUEST = 'washes/getWashedRequest';
export const GET_WASHES_SUCCESS = 'washes/getWashedSuccess';
export const GET_WASHES_FAILURE = 'washes/getWashedFailure';

export const CREATE_WASH_REQUEST = 'washes/createWashRequest';
export const CREATE_WASH_SUCCESS = 'washes/createWashSuccess';
export const CREATE_WASH_FAILURE = 'washes/createWashFailure';

export type WashesState = {
  washesStatus: ReduxStatus;
  washes: Wash[];
};

// Fetch washes
interface GetWashesRequestAction {
  type: typeof GET_WASHES_REQUEST;
}

interface GetWashesSuccessAction {
  type: typeof GET_WASHES_SUCCESS;
  payload: Wash[];
}

interface GetWashesFailureAction {
  type: typeof GET_WASHES_FAILURE;
  payload: string;
}

// Create wash
interface CreateWashRequestAction {
  type: typeof CREATE_WASH_REQUEST;
  payload: FormData;
}

interface CreateWashSuccessAction {
  type: typeof CREATE_WASH_SUCCESS;
  payload: Wash;
}

interface CreateWashFailureAction {
  type: typeof CREATE_WASH_FAILURE;
  payload: string;
}

export type WashesActionTypes =
  | GetWashesRequestAction
  | GetWashesSuccessAction
  | GetWashesFailureAction
  | CreateWashRequestAction
  | CreateWashSuccessAction
  | CreateWashFailureAction;
