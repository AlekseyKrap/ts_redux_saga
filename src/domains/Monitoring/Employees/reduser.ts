import { Record } from 'immutable';
import {
  TAPIEmployeeData,
  TAPIlistEmployees,
  TAPIRegionsList,
  TAPIRoleList,
  TAPIUsersPage,
} from '../../../api';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { genReceivedData, ReceivedData } from '../../../workers/makeReqWithRD';
import { TActionsR } from '../../../types';

export type TR_Employees = {
  employees: Record<ReceivedData<TAPIlistEmployees>>;
  employees_RoleList: TAPIRoleList;
  employees_RegionsList: TAPIRegionsList;
  employess_Data: Record<ReceivedData<TAPIEmployeeData>>;
};
export const rInitREmployees: TR_Employees = {
  employees: genReceivedData<TAPIlistEmployees>([]),
  employees_RoleList: [],
  employees_RegionsList: [],
  employess_Data: genReceivedData<TAPIEmployeeData>(null),
};

const State: Record.Factory<TR_Employees> = Record(rInitREmployees);

export type TEmployeesClearAction = {
  type: 'EMPLOYEES_CLEAR';
  payload: keyof TR_Employees;
};
export type TEmployeesClearActionALL = {
  type: 'EMPLOYEES_CLEAR_ALL';
};

export type TEmployeesMergeAction = {
  type: 'EMPLOYEES_MERGE';
  payload: Partial<TR_Employees>;
};

export type TActionsR_Employees =
  | TActionsR<TR_Employees>
  | TEmployeesClearAction
  | TEmployeesClearActionALL
  | TEmployeesMergeAction;

export const employees_reducer = function (
  state: Record<TR_Employees> = new State(),
  action: TActionsR_Employees,
): Record<TR_Employees> {
  if (action.type === 'EMPLOYEES_CLEAR') {
    return state.delete(action.payload);
  }
  if (action.type === 'EMPLOYEES_CLEAR_ALL') {
    return state.clear();
  }
  if (action.type === 'EMPLOYEES_MERGE') {
    return state.merge(action.payload);
  }

  return state.set(action.type, action.payload);
};
