import { Record } from 'immutable';
import {
  TAPIEmployeeData,
  TAPIlistEmployees,
  TAPIRegionsList,
  TAPIRoleList,
} from '../../../api';
import { genReceivedData, ReceivedData } from '../../../workers/makeReqWithRD';
import { TActionsR } from '../../../types';

export type TREmployees = {
  employees: Record<ReceivedData<TAPIlistEmployees>>;
  'employees/RoleList': TAPIRoleList;
  'employees/RegionsList': TAPIRegionsList;
  'employess/Data': Record<ReceivedData<TAPIEmployeeData>>;
};
export const rInitEmployees: TREmployees = {
  employees: genReceivedData<TAPIlistEmployees>([]),
  'employees/RoleList': [],
  'employees/RegionsList': [],
  'employess/Data': genReceivedData<TAPIEmployeeData>(null),
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

export type TActionsR_Employees =
  | TActionsR<TREmployees>
  | TAEmployeesClear
  | TAEmployeesClearALL
  | TAEmployeesMerge;

export const employees_reducer = function (
  state: Record<TREmployees> = State(),
  action: TActionsR_Employees,
): Record<TREmployees> {
  if (action.type === 'employees/clear') {
    return state.delete(action.payload);
  }
  if (action.type === 'employees/clearAll') {
    return state.clear();
  }
  if (action.type === 'employees/merge') {
    return state.merge(action.payload);
  }

  return state.set(action.type, action.payload);
};
