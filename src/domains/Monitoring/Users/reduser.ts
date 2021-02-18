import { Record } from 'immutable';
import { genReceivedData, ReceivedData } from '../../../workers/makeReqWithRD';
import { TAPIUsersPage } from '../../../api';
import { TActionsR } from '../../../types';

export type RUserItem = {
  id: number;
  login: string;
};

export type TRMonitoring = {
  'monit/listUsers': Record<ReceivedData<Array<RUserItem>>>;
  'monit/UsersPage': Record<ReceivedData<TAPIUsersPage>>;
};
export const rInitMonitoring: TRMonitoring = {
  'monit/listUsers': genReceivedData<Array<RUserItem>>([]),
  'monit/UsersPage': genReceivedData<TAPIUsersPage>([]),
};

const State: Record.Factory<TRMonitoring> = Record(rInitMonitoring);

export type TAMonitClear = {
  type: 'monit/clear';
  payload: keyof TRMonitoring;
};
export type TAMonitClearALL = {
  type: 'monit/clearAll';
};

export type TActionsR_Monit =
  | TActionsR<TRMonitoring>
  | TAMonitClear
  | TAMonitClearALL;

export const monitoring_reducer = function (
  state: Record<TRMonitoring> = State(),
  action: TActionsR_Monit
): Record<TRMonitoring> {
  if (action.type === 'monit/clear') {
    return state.delete(action.payload);
  }
  if (action.type === 'monit/clearAll') {
    return state.clear();
  }

  return state.set(action.type, action.payload);
};
