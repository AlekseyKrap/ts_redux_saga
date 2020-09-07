import { Record } from 'immutable';
import { ErrorHttpAction } from '../../../workers/makeRequestWithSpinner';
import { TAPIUsersPage } from '../../../api';
import { TActionsR } from '../../../types';

export type RUserItem = {
  id: number;
  login: string;
};

export type TR_Monitoring = {
  monit_listUsers: Array<RUserItem>;
  monit_usersIsLoading: boolean;
  monit_listUsers_Er: ErrorHttpAction;
  monit_UsersPage: TAPIUsersPage;
  monit_UsersPageIsLoading: boolean;
  monit_UsersPage_Er: ErrorHttpAction;
};
export const rInitRMonitoring: TR_Monitoring = {
  monit_listUsers: [],
  monit_usersIsLoading: true,
  monit_listUsers_Er: {
    error: false,
    message: '',
  },
  monit_UsersPage: [],
  monit_UsersPageIsLoading: true,
  monit_UsersPage_Er: {
    error: false,
    message: '',
  },
};

const State: Record.Factory<TR_Monitoring> = Record(rInitRMonitoring);

export type TMonitClearAction = {
  type: 'MONIT_CLEAR';
  payload: keyof TR_Monitoring;
};
export type TMonitClearActionALL = {
  type: 'MONIT_CLEAR_ALL';
};

export type TActionsR_Monit =
  | TActionsR<TR_Monitoring>
  | TMonitClearAction
  | TMonitClearActionALL;

export const monitoring_reducer = function (
  state: Record<TR_Monitoring> = new State(),
  action: TActionsR_Monit,
): Record<TR_Monitoring> {
  if (action.type === 'MONIT_CLEAR') {
    return state.delete(action.payload);
  }
  if (action.type === 'MONIT_CLEAR_ALL') {
    return state.clear();
  }

  return state.set(action.type, action.payload);
};
