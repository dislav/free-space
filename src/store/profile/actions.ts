import { ProfileState, SET_LOGGED_IN, SET_PROFILE } from './types';

export const setProfile = (payload: ProfileState) => ({
  type: SET_PROFILE,
  payload,
});

export const setLoggedIn = (payload: boolean) => ({
  type: SET_LOGGED_IN,
  payload,
});
