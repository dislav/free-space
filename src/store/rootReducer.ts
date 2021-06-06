import { combineReducers } from 'redux';
import { profileReducer } from './profile/reducer';
import { washesReducer } from './washes/reducer';
import { sandwichReducer } from './sandwich/reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  washes: washesReducer,
  sandwich: sandwichReducer,
});

export default rootReducer;
