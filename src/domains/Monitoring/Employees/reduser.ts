import {
  TAPIEmployeeData,
  TAPIlistEmployees,
  TAPIRegionsList,
  TAPIRoleList,
} from '../../../api';
import { genFetchedData, FetchedData } from '../../../core/fetchedData';
import initReducer from '../../../init/initReducer';

export type TREmployees = {
  employees: FetchedData<TAPIlistEmployees>;
  RoleList: FetchedData<TAPIRoleList>;
  RegionsList: FetchedData<TAPIRegionsList>;
  Data: FetchedData<TAPIEmployeeData>;
};
const rInitEmployees: TREmployees = {
  employees: genFetchedData<TAPIlistEmployees>(null),
  RoleList: genFetchedData<TAPIRoleList>([]),
  RegionsList: genFetchedData<TAPIRegionsList>([]),
  Data: genFetchedData<TAPIEmployeeData>(null),
};

export const { reducer, actions } = initReducer(rInitEmployees, 'employees');
