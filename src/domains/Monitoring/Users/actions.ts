import {
  TActionlistUsers,
  TFetchUsersList,
  TGetlistUsersAsync,
  TGetUsersPageAsync,
  TMonit_listUsers_Er,
  TMonit_UsersPage,
  TMonit_UsersPage_Er,
  TUsersPageIsLoading,
} from './types';
import { TGetEmployeeDataByIdAsync } from '../Employees/types';

export function getlistUsers(): TGetlistUsersAsync {
  return {
    type: 'MONIT_GET_LIST_USERS',
  };
}
export function getUsersPage(
  userId?: TGetUsersPageAsync['payload'],
): TGetUsersPageAsync {
  return {
    type: 'MONIT_GET_USERS_PAGE',
    payload: userId,
  };
}

export function fetchUsersList(
  status: TFetchUsersList['payload'],
): TFetchUsersList {
  return {
    type: 'monit_usersIsLoading',
    payload: status,
  };
}

export const filLlistUsers = (
  v: TActionlistUsers['payload'],
): TActionlistUsers => ({
  type: 'monit_listUsers',
  payload: v,
});

export const setErrorListUsers = (
  e: boolean,
  m: string,
): TMonit_listUsers_Er => ({
  type: 'monit_listUsers_Er',
  payload: {
    error: e,
    message: m,
  },
});

export function usersPageIsLoading(
  status: TUsersPageIsLoading['payload'],
): TUsersPageIsLoading {
  return {
    type: 'monit_UsersPageIsLoading',
    payload: status,
  };
}

export function setUsersPage(v: TMonit_UsersPage['payload']): TMonit_UsersPage {
  return {
    type: 'monit_UsersPage',
    payload: v,
  };
}

export const setErrorUsersPage = (
  e: boolean,
  m: string,
): TMonit_UsersPage_Er => ({
  type: 'monit_UsersPage_Er',
  payload: {
    error: e,
    message: m,
  },
});

export function getEmployeeData(
  employeeId: TGetEmployeeDataByIdAsync['payload'],
): TGetEmployeeDataByIdAsync {
  return {
    type: 'EMPLOYEES_GET_DATA',
    payload: employeeId,
  };
}
