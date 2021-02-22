import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import {
  APIGetAllUsersPage,
  APIGetlistUsers,
  APIGetUsersPageById,
} from '../../../../api';

import { actions } from '../reduser';
import { TGetUsersPageAsync } from '../types';

import { makeReqWithRD, TMakeReqWithRD } from '../../../../core/makeReqWithRD';

export function* workerGetlistUsers(): SagaIterator<void> {
  try {
    yield call<TMakeReqWithRD<typeof APIGetlistUsers>>(makeReqWithRD, {
      fetcher: APIGetlistUsers,
      fill: (v) => actions.set('listUsers', v),
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
        fill: (v) => actions.set('usersPage', v),
      });
      return;
    }

    if (typeof payload === 'string') {
      yield call<TMakeReqWithRD<typeof APIGetUsersPageById>>(makeReqWithRD, {
        fetcher: APIGetUsersPageById,
        fill: (v) => actions.set('usersPage', v),
        parameters: { field: 'usrId', value: payload },
      });
      return;
    }
  } catch (e) {
    console.error({ e });
  }
}
