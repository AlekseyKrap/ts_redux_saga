import { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  APIGetAllUsersPage,
  APIGetlistUsers,
  APIGetUsersPageById,
} from '../../../../api';

import { TMonitClearAction } from '../reduser';
import { TGetUsersPageAsync } from '../types';
import { makeRequestWithSpinner } from '../../../../workers';
import {
  OptionsType,
  TmakeRequestWithSpinner,
} from '../../../../workers/makeRequestWithSpinner';
import {
  fetchUsersList,
  filLlistUsers,
  setErrorListUsers,
  setErrorUsersPage,
  setUsersPage,
  usersPageIsLoading,
} from '../actions';

export function* getlistUsers(): SagaIterator<void> {
  try {
    const opt: OptionsType = {
      fetcher: APIGetlistUsers,
      isFetching: fetchUsersList,
      fill: filLlistUsers,
      setErrorAction: setErrorListUsers,
    };

    yield call<TmakeRequestWithSpinner>(makeRequestWithSpinner, opt);
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
      const opt: OptionsType = {
        fetcher: APIGetAllUsersPage,
        isFetching: usersPageIsLoading,
        fill: setUsersPage,
        setErrorAction: setErrorUsersPage,
      };
      yield call<TmakeRequestWithSpinner>(makeRequestWithSpinner, opt);
      return;
    }

    if (typeof payload === 'string') {
      const opt: OptionsType = {
        fetcher: APIGetUsersPageById,
        parameters: { field: 'usrId', value: payload },
        isFetching: usersPageIsLoading,
        fill: setUsersPage,
        setErrorAction: setErrorUsersPage,
      };
      yield call<TmakeRequestWithSpinner>(makeRequestWithSpinner, opt);
      return;
    }
  } catch (e) {
    console.error({ e });
  }
}
