import { genFetchedData, FetchedData } from '../../../core/fetchedData';
import type { TAPIUsersPage } from '../../../api';
import initReducer from '../../../init/initReducer';

export type RUserItem = {
  id: number;
  login: string;
};

export type TRMonitoring = {
  listUsers: FetchedData<Array<RUserItem>>;
  usersPage: FetchedData<TAPIUsersPage>;
};
export const rInitMonitoring: TRMonitoring = {
  listUsers: genFetchedData<Array<RUserItem>>([]),
  usersPage: genFetchedData<TAPIUsersPage>([]),
};

export const { reducer, actions } = initReducer(rInitMonitoring, 'users');
