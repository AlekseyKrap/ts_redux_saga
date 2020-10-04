import { SagaIterator } from 'redux-saga';
import {
 put, call, apply, SagaReturnType, 
} from 'redux-saga/effects';
import {
  APIGetAllUsersPage,
  APIGetlistUsers,
  APIGetUsersPageById,
} from '../../../../api';

import { TMonitClearAction } from '../reduser';
import { TGetUsersPageAsync } from '../types';

import {
  makeReqWithRD,
  TMakeReqWithRD,
} from '../../../../workers/makeReqWithRD';
import { filLlistUsers, setUsersPage } from '../actions';

export function* getlistUsers(): SagaIterator<void> {
  try {
    yield call<TMakeReqWithRD<typeof APIGetlistUsers>>(makeReqWithRD, {
      fetcher: APIGetlistUsers,
      fill: filLlistUsers,
    });
  } catch (e) {
    console.error({ e });
  }
}
export function* workerGetUsersPage({
  payload,
}: TGetUsersPageAsync): SagaIterator<void> {
  try {
    yield put<TMonitClearAction>({
      type: 'MONIT_CLEAR',
      payload: 'monit_UsersPage',
    });

    if (payload === undefined) {
      yield call<TMakeReqWithRD<typeof APIGetAllUsersPage>>(makeReqWithRD, {
        fetcher: APIGetAllUsersPage,
        fill: setUsersPage,
      });
      return;
    }

    if (typeof payload === 'string') {
      yield call<TMakeReqWithRD<typeof APIGetUsersPageById>>(makeReqWithRD, {
        fetcher: APIGetUsersPageById,
        fill: setUsersPage,
        parameters: { field: 'usrId', value: payload },
      });
      return;
    }
  } catch (e) {
    console.error({ e });
  }
}
