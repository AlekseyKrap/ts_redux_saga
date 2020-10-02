import { TR_Employees } from './reduser';
import { TItemR, TItemRNonNullable } from '../../../types';

export type TGetlistEmployeesAsync = {
  type: 'EMPLOYEES_GET_LIST';
};

export type TGetEmployeeDataByIdAsync = {
  type: 'EMPLOYEES_GET_DATA';
  payload: string;
};

export type TAFetchEmployeesList = TItemR<TR_Employees, 'employees_IsLoading'>;
export type TAEmployeeslist = TItemR<TR_Employees, 'employees'>;
export type TAEmployees_Er = TItemR<TR_Employees, 'employees_Er'>;

export type TARoleList = TItemR<TR_Employees, 'employees_RoleList'>;
export type TARegionsList = TItemR<TR_Employees, 'employees_RegionsList'>;

export type TAFetchEmployeeData = TItemR<
  TR_Employees,
  'employess_Data_IsLoading'
>;

export type TAEmployeeData = TItemRNonNullable<TR_Employees, 'employess_Data'>;
export type TAEmployeesDataEr = TItemR<TR_Employees, 'employess_Data_Er'>;
