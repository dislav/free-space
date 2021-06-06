export const SET_SANDWICH = 'sandwich/setSandwich';

export interface SandwichState {
  isOpen: boolean;
}

interface SetSandwichAction {
  type: typeof SET_SANDWICH;
  payload: boolean;
}

export type SandwichActionTypes = SetSandwichAction;
