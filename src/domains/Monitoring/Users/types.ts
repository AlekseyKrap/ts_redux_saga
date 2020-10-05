import { TRMonitoring } from './reduser';
import { TItemR } from '../../../types';

export type TGetlistUsersAsync = {
  type: 'monit/getListUsers';
};
export type TGetUsersPageAsync = {
  type: 'monit/getUsersPage';
  payload?: string;
};

export type TActionlistUsers = TItemR<TRMonitoring, 'monit/listUsers'>;
export type TMonit_UsersPage = TItemR<TRMonitoring, 'monit/UsersPage'>;
