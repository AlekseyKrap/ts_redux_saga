import { Record } from 'immutable';
import {
  TAPIEmployeeData,
  TAPIlistEmployees,
  TAPIRegionsList,
  TAPIRoleList,
} from '../../../api';
import { genFetchedData, FetchedData } from '../../../core/fetchedData';
import { TActionsR } from '../../../types';
import initReducer from '../../../init/initReducer';
import { rInitMenu } from '../../Menu/reduser';

export type TREmployees = {
  employees: FetchedData<TAPIlistEmployees>;
  RoleList: FetchedData<TAPIRoleList>;
  RegionsList: FetchedData<TAPIRegionsList>;
  Data: FetchedData<TAPIEmployeeData>;
};
export const rInitEmployees: TREmployees = {
  employees: genFetchedData<TAPIlistEmployees>(null),
  RoleList: genFetchedData<TAPIRoleList>([]),
  RegionsList: genFetchedData<TAPIRegionsList>([]),
  Data: genFetchedData<TAPIEmployeeData>(null),
};

const State: Record.Factory<TREmployees> = Record(rInitEmployees);

export type TAEmployeesClear = {
  type: 'employees/clear';
  payload: keyof TREmployees;
};
export type TAEmployeesClearALL = {
  type: 'employees/clearAll';
};

export type TAEmployeesMerge = {
  type: 'employees/merge';
  payload: Partial<TREmployees>;
};

// export type TActionsR_Employees =
//   | TActionsR<TREmployees>
//   | TAEmployeesClear
//   | TAEmployeesClearALL
//   | TAEmployeesMerge;
//
// export const employees_reducer = function (
//   state: Record<TREmployees> = State(),
//   action: TActionsR_Employees,
// ): Record<TREmployees> {
//   if (action.type === 'employees/clear') {
//     return state.delete(action.payload);
//   }
//   if (action.type === 'employees/clearAll') {
//     return state.clear();
//   }
//   if (action.type === 'employees/merge') {
//     return state.merge(action.payload);
//   }
//
//   return state.set(action.type, action.payload);
// };

export const { reducer, actions } = initReducer(rInitEmployees, 'employees');
