import { TGetlistUsersAsync, TGetUsersPageAsync } from './types';

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
