import { TR_Monitoring } from './reduser';
import { TItemR } from '../../../types';

export type TGetlistUsersAsync = {
  type: 'MONIT_GET_LIST_USERS';
};
export type TGetUsersPageAsync = {
  type: 'MONIT_GET_USERS_PAGE';
  payload?: string;
};

export type TFetchUsersList = TItemR<TR_Monitoring, 'monit_usersIsLoading'>;
export type TActionlistUsers = TItemR<TR_Monitoring, 'monit_listUsers'>;
export type TMonit_listUsers_Er = TItemR<TR_Monitoring, 'monit_listUsers_Er'>;
export type TUsersPageIsLoading = TItemR<
  TR_Monitoring,
  'monit_UsersPageIsLoading'
>;
export type TMonit_UsersPage = TItemR<TR_Monitoring, 'monit_UsersPage'>;
export type TMonit_UsersPage_Er = TItemR<TR_Monitoring, 'monit_UsersPage_Er'>;
