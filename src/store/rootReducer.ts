import { combineReducers } from 'redux';
import { profileReducer } from './profile/reducer';
import { sandwichReducer } from './sandwich/reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  sandwich: sandwichReducer,
});

export default rootReducer;
