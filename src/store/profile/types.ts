import { User } from '../../interfaces/types';

export const SET_PROFILE = 'profile/setProfile';
export const SET_LOGGED_IN = 'profile/setLoggedIn';

export interface ProfileState {
  user: User;
  loggedIn: boolean;
}

interface SetProfileAction {
  type: typeof SET_PROFILE;
  payload: ProfileState;
}

interface SetLoggedInAction {
  type: typeof SET_LOGGED_IN;
  payload: boolean;
}

export type ProfileActionTypes = SetProfileAction | SetLoggedInAction;
