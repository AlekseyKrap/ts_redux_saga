import { Record } from 'immutable';
import { TActionsR } from '../../types';

export type TRMenu = {
  'isOpen': boolean;
};
export const rInitMenu: TRMenu = {
  isOpen: false,
};

function createState<T extends {[k:string]:unknown}>(name:string,init:T):Record.Factory<T> {

  return Record(Object.entries(init))
}

const State: Record.Factory<TRMenu> = Record(rInitMenu);

export type TActionsR_Menu = TActionsR<TRMenu>;

export const menu_reducer = function (
  state: Record<TRMenu> = State(),
  action: TActionsR_Menu,
): Record<TRMenu> {
  return state.set(action.type, action.payload);
};
