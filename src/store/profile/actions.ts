import {
  ProfileState,
  SET_LOGGED_IN,
  SET_PROFILE,
  ProfileActionTypes,
} from './types';

export const setProfile = (payload: ProfileState): ProfileActionTypes => ({
  type: SET_PROFILE,
  payload,
});

export const setLoggedIn = (payload: boolean): ProfileActionTypes => ({
  type: SET_LOGGED_IN,
  payload,
});
