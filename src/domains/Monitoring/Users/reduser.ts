import { genFetchedData, FetchedData } from '../../../core/fetchedData';
import { TAPIUsersPage } from '../../../api';
import initReducer from '../../../init/initReducer';

export type RUserItem = {
  id: number;
  login: string;
};

export type TRMonitoring = {
  listUsers: FetchedData<Array<RUserItem>>;
  usersPage: FetchedData<TAPIUsersPage>;
};
export const rInitMonitoring: TRMonitoring = {
  listUsers: genFetchedData<Array<RUserItem>>([]),
  usersPage: genFetchedData<TAPIUsersPage>([]),
};
//
// const State: Record.Factory<TRMonitoring> = Record(rInitMonitoring);
//
// export type TAMonitClear = {
//   type: 'monit/clear';
//   payload: keyof TRMonitoring;
// };
// export type TAMonitClearALL = {
//   type: 'monit/clearAll';
// };
//
// export type TActionsR_Monit =
//   | TActionsR<TRMonitoring>
//   | TAMonitClear
//   | TAMonitClearALL;

// export const monitoring_reducer = function (
//   state: Record<TRMonitoring> = State(),
//   action: TActionsR_Monit
// ): Record<TRMonitoring> {
//   if (action.type === 'monit/clear') {
//     return state.delete(action.payload);
//   }
//   if (action.type === 'monit/clearAll') {
//     return state.clear();
//   }
//
//   return state.set(action.type, action.payload);
// };

export const { reducer, actions } = initReducer(rInitMonitoring, 'users');
