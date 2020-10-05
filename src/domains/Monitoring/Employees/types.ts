import { TREmployees } from './reduser';
import { TItemR, TItemRNonNullable } from '../../../types';

export type TGetlistEmployeesAsync = {
  type: 'employees/getList';
};

export type TGetEmployeeDataByIdAsync = {
  type: 'employees/getData';
  payload: string;
};

export type TAEmployeeslist = TItemR<TREmployees, 'employees'>;
export type TARoleList = TItemR<TREmployees, 'employees/RoleList'>;
export type TARegionsList = TItemR<TREmployees, 'employees/RegionsList'>;
export type TAEmployeeData = TItemRNonNullable<TREmployees, 'employess/Data'>;
