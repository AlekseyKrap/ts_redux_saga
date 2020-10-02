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
import { makeRequestWithSpinner } from '../../../../workers';
import { TmakeRequestWithSpinner } from '../../../../workers/makeRequestWithSpinner';
import { filLlistUsers, setUsersPage } from '../actions';

export function* getlistUsers(): SagaIterator<void> {
  try {
    yield call<TmakeRequestWithSpinner<typeof APIGetlistUsers>>(
      makeRequestWithSpinner,
      {
        fetcher: APIGetlistUsers,
        fill: filLlistUsers,
      },
    );
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
      yield call<TmakeRequestWithSpinner<typeof APIGetAllUsersPage>>(
        makeRequestWithSpinner,
        { fetcher: APIGetAllUsersPage, fill: setUsersPage },
      );
      return;
    }

    if (typeof payload === 'string') {
      yield call<TmakeRequestWithSpinner<typeof APIGetUsersPageById>>(
        makeRequestWithSpinner,
        {
          fetcher: APIGetUsersPageById,
          fill: setUsersPage,
          parameters: { field: 'usrId', value: payload },
        },
      );
      return;
    }
  } catch (e) {
    console.error({ e });
  }
}
