import { SandwichActionTypes, SET_SANDWICH } from './types';

export const setSandwich = (payload: boolean): SandwichActionTypes => ({
  type: SET_SANDWICH,
  payload,
});
