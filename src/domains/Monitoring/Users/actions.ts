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

export const filLlistUsers = (
  v: TActionlistUsers['payload'],
): TActionlistUsers => ({
  type: 'monit_listUsers',
  payload: v,
});

export function setUsersPage(v: TMonit_UsersPage['payload']): TMonit_UsersPage {
  return {
    type: 'monit_UsersPage',
    payload: v,
  };
}
