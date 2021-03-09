import type { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import {
  APIGetAllUsersPage,
  APIGetlistUsers,
  APIGetUsersPageById,
  TAPIlistUsersResp,
  TAPIUsersPage,
} from '../../../../api';

import { actions } from '../reduser';
import type { TGetUsersPageAsync } from '../types';

import { makeReqWithRD, TMakeReqWithRD } from '../../../../core/makeReqWithRD';
import type { FetchedData } from '../../../../core/fetchedData';

export const fillistUsers = (v: FetchedData<TAPIlistUsersResp>) =>
  actions.set('listUsers', v);
export const fillUsersPage = (v: FetchedData<TAPIUsersPage>) =>
  actions.set('usersPage', v);

export function* workerGetlistUsers(): SagaIterator<void> {
  try {
    yield call<TMakeReqWithRD<typeof APIGetlistUsers>>(makeReqWithRD, {
      fetcher: APIGetlistUsers,
      fill: fillistUsers,
    });
  } catch (e) {
    console.error({ e });
  }
}

export function* workerGetUsersPage({
  payload,
}: TGetUsersPageAsync): SagaIterator<void> {
  try {
    if (payload === undefined) {
      yield call<TMakeReqWithRD<typeof APIGetAllUsersPage>>(makeReqWithRD, {
        fetcher: APIGetAllUsersPage,
        fill: fillUsersPage,
      });
      return;
    }

    if (typeof payload === 'string') {
      yield call<TMakeReqWithRD<typeof APIGetUsersPageById>>(makeReqWithRD, {
        fetcher: APIGetUsersPageById,
        fill: fillUsersPage,
        parameters: { field: 'usrId', value: payload },
      });
      return;
    }
  } catch (e) {
    console.error({ e });
  }
}
