import type {
  TGetEmployeeDataByIdAsync,
  TGetlistEmployeesAsync,
} from './types';

export function getlistEmployees(): TGetlistEmployeesAsync {
  return {
    type: 'employees/getList',
  };
}

export function getEmployeeData(
  employeeId: TGetEmployeeDataByIdAsync['payload'],
): TGetEmployeeDataByIdAsync {
  return {
    type: 'employees/getData',
    payload: employeeId,
  };
}
