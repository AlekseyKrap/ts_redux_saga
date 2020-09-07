import { Record } from 'immutable';
import { TActionsR } from '../../types';

export type TRInitMenu = {
  menu_isOpen: boolean;
};
export const rInitRMenu: TRInitMenu = {
  menu_isOpen: false,
};

const State: Record.Factory<TRInitMenu> = Record(rInitRMenu);

export type TActionsMenuR = TActionsR<TRInitMenu>;

export const menu_reducer = function (
  state: Record<TRInitMenu> = new State(),
  action: TActionsMenuR,
): Record<TRInitMenu> {
  return state.set(action.type, action.payload);
};
