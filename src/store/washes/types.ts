import { StatusState, Wash } from '../../interfaces/types';

export const GET_WASHES_REQUEST = 'washes/getWashedRequest';
export const GET_WASHES_SUCCESS = 'washes/getWashedSuccess';
export const GET_WASHES_FAILURE = 'washes/getWashedFailure';

export interface WashesState extends StatusState {
  washes: Wash[];
}

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

export type WashesActionTypes =
  | GetWashesRequestAction
  | GetWashesSuccessAction
  | GetWashesFailureAction;
