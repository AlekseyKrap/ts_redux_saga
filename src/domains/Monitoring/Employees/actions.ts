import {
  TAEmployeeData,
  TAEmployees_Er,
  TAEmployeesDataEr,
  TAEmployeeslist,
  TAFetchEmployeeData,
  TAFetchEmployeesList,
  TARegionsList,
  TARoleList,
  TGetlistEmployeesAsync,
} from './types';
import { TEmployeesClearActionALL } from './reduser';

export function getlistEmployees(): TGetlistEmployeesAsync {
  return {
    type: 'EMPLOYEES_GET_LIST',
  };
}

export function employeesClearALL(): TEmployeesClearActionALL {
  return {
    type: 'EMPLOYEES_CLEAR_ALL',
  };
}

export function fetchingEmployeesList(
  v: TAFetchEmployeesList['payload'],
): TAFetchEmployeesList {
  return {
    type: 'employees_IsLoading',
    payload: v,
  };
}

export const employeeslist = (
  v: TAEmployeeslist['payload'],
): TAEmployeeslist => ({
  type: 'employees',
  payload: v,
});

export const setErrorEmployees = (e: boolean, m: string): TAEmployees_Er => ({
  type: 'employees_Er',
  payload: {
    error: e,
    message: m,
  },
});

export const roleListAction = (v: TARoleList['payload']): TARoleList => ({
  type: 'employees_RoleList',
  payload: v,
});
export const regionsListAction = (
  v: TARegionsList['payload'],
): TARegionsList => ({
  type: 'employees_RegionsList',
  payload: v,
});

export const fetchEmployeeData = (
  v: TAFetchEmployeeData['payload'],
): TAFetchEmployeeData => ({
  type: 'employess_Data_IsLoading',
  payload: v,
});

export const employeeData = (v: TAEmployeeData['payload']): TAEmployeeData => ({
  type: 'employess_Data',
  payload: v,
});

export const employeesDataEr = (e: boolean, m: string): TAEmployeesDataEr => ({
  type: 'employess_Data_Er',
  payload: {
    error: e,
    message: m,
  },
});
