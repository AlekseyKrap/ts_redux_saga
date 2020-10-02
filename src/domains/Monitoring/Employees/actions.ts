import {
  TAEmployeeData,
  TAEmployees_Er,
  TAEmployeesDataEr,
  TAEmployeeslist,
  TAFetchEmployeeData,
  TAFetchEmployeesList,
  TGetEmployeeDataByIdAsync,
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

export const employeeslist = (
  v: TAEmployeeslist['payload'],
): TAEmployeeslist => ({
  type: 'employees',
  payload: v,
});

export const employeeData = (v: TAEmployeeData['payload']): TAEmployeeData => ({
  type: 'employess_Data',
  payload: v,
});

export function getEmployeeData(
  employeeId: TGetEmployeeDataByIdAsync['payload'],
): TGetEmployeeDataByIdAsync {
  return {
    type: 'EMPLOYEES_GET_DATA',
    payload: employeeId,
  };
}
