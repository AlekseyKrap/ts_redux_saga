import {
  TActionlistUsers,
  TGetlistUsersAsync,
  TGetUsersPageAsync,
  TMonit_UsersPage,
} from './types';

export function getlistUsers(): TGetlistUsersAsync {
  return {
    type: 'monit/getListUsers',
  };
}
export function getUsersPage(
  userId?: TGetUsersPageAsync['payload'],
): TGetUsersPageAsync {
  return {
    type: 'monit/getUsersPage',
    payload: userId,
  };
}

export const filLlistUsers = (
  v: TActionlistUsers['payload'],
): TActionlistUsers => ({
  type: 'monit/listUsers',
  payload: v,
});

export function setUsersPage(v: TMonit_UsersPage['payload']): TMonit_UsersPage {
  return {
    type: 'monit/UsersPage',
    payload: v,
  };
}
