import { combineReducers } from 'redux';
import { sandwichReducer } from './sandwich/reducer';

const rootReducer = combineReducers({
  sandwich: sandwichReducer,
});

export default rootReducer;
