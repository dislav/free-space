import { SandwichActionTypes, SandwichState, SET_SANDWICH } from './types';

const initialState: SandwichState = {
  isOpen: false,
};

export const sandwichReducer = (
  state = initialState,
  action: SandwichActionTypes
): SandwichState => {
  switch (action.type) {
    case SET_SANDWICH:
      return { isOpen: action.payload };
    default:
      return state;
  }
};
