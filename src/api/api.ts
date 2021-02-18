import genFetchData from './aPIFetchData';

export type TAPIlistUsersResp = Array<{
  id: number;
  login: string;
}>;

export type TAPIUsersPage = Array<{
  id: number;
  usrId: number;
  login: string;
  date: number;
  page: string;
}>;

export type TPUsersPageById = {
  field: 'usrId';
  value: string;
};

export type TAPIlistEmployees = Array<{
  id: number;
  fullName: string;
}>;
export type TAPIRoleList = Array<{
  id: number;
  description: string;
}>;
export type TAPIRegionsList = Array<{
  id: number;
  description: string;
}>;
export type TAPIEmployeeData = {
  id: number;
  role: number;
  region: number;
};
export type TPEmployeeDataById = {
  value: string;
};

export const APIGetlistUsers = genFetchData<TAPIlistUsersResp>('/users.logins');
export const APIGetAllUsersPage = genFetchData<TAPIUsersPage>('/users.page');
export const APIGetUsersPageById = genFetchData<TAPIUsersPage, TPUsersPageById>(
  '/users.page'
);
export const APIGetlistEmployees = genFetchData<TAPIlistEmployees>(
  '/employees.list'
);
export const APIGetRoleList = genFetchData<TAPIRoleList>('/employees.roleList');
export const APIGetRegionsList = genFetchData<TAPIRegionsList>(
  '/employees.regionsList'
);
export const APIGetEmployeesDataById = genFetchData<
  TAPIEmployeeData,
  TPEmployeeDataById
>('/employees.data');
