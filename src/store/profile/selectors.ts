import { RootState } from '../store';

export const getIsLoggedIn = (state: RootState) => state.profile.loggedIn;
