import { RootState } from '../store';

export const getSandwich = (state: RootState) => state.sandwich.isOpen;
