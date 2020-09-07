import aPIFetchData from './aPIFetchData';

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

export const APIGetlistUsers = aPIFetchData<TAPIlistUsersResp>('/users.logins');
export const APIGetAllUsersPage = aPIFetchData<TAPIUsersPage>('/users.page');
export const APIGetUsersPageById = aPIFetchData<TAPIUsersPage, TPUsersPageById>(
  '/users.page',
);
export const APIGetlistEmployees = aPIFetchData<TAPIlistEmployees>(
  '/employees.list',
);
export const APIGetRoleList = aPIFetchData<TAPIRoleList>('/employees.roleList');
export const APIGetRegionsList = aPIFetchData<TAPIRegionsList>(
  '/employees.regionsList',
);
export const APIGetEmployeesDataById = aPIFetchData<
  TAPIEmployeeData,
  TPEmployeeDataById
>('/employees.data');
