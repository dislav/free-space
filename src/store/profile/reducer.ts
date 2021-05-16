import {
  ProfileActionTypes,
  ProfileState,
  SET_LOGGED_IN,
  SET_PROFILE,
} from './types';
import cookie from 'cookie';

const sessionId = cookie.parse(document.cookie).ukey28;

const initialState: ProfileState = {
  user: {
    id: null,
    mail: null,
    username: null,
    first_name: null,
    last_name: null,
    phone: null,
  },
  loggedIn: !!sessionId,
};

export const profileReducer = (
  state = initialState,
  action: ProfileActionTypes
): ProfileState => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    default:
      return state;
  }
};
