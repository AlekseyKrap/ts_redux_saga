import {
  TAEmployeeData,
  TAEmployeeslist,
  TGetEmployeeDataByIdAsync,
  TGetlistEmployeesAsync,
} from './types';
import { TAEmployeesClearALL } from './reduser';

export function getlistEmployees(): TGetlistEmployeesAsync {
  return {
    type: 'employees/getList',
  };
}
export function employeesClearALL(): TAEmployeesClearALL {
  return {
    type: 'employees/clearAll',
  };
}
export const employeeslist = (
  v: TAEmployeeslist['payload']
): TAEmployeeslist => ({
  type: 'employees',
  payload: v,
});

export function getEmployeeData(
  employeeId: TGetEmployeeDataByIdAsync['payload']
): TGetEmployeeDataByIdAsync {
  return {
    type: 'employees/getData',
    payload: employeeId,
  };
}
