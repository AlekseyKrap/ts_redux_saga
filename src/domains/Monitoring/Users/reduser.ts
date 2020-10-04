import { Record } from 'immutable';
import { genReceivedData, ReceivedData } from '../../../workers/makeReqWithRD';
import { TAPIlistEmployees, TAPIUsersPage } from '../../../api';
import { TActionsR } from '../../../types';

export type RUserItem = {
  id: number;
  login: string;
};

export type TR_Monitoring = {
  monit_listUsers: Record<ReceivedData<Array<RUserItem>>>;
  monit_UsersPage: Record<ReceivedData<TAPIUsersPage>>;
};
export const rInitRMonitoring: TR_Monitoring = {
  monit_listUsers: genReceivedData<Array<RUserItem>>([]),

  monit_UsersPage: genReceivedData<TAPIUsersPage>([]),
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
