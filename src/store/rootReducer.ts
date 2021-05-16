import { combineReducers } from 'redux';
import { profileReducer } from './profile/reducer';
import { washesReducer } from './washes/reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  washes: washesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
