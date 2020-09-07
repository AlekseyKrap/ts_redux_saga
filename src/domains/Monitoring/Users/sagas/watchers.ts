import { SagaIterator } from '@redux-saga/core';
import { takeEvery } from 'redux-saga/effects';
import { getlistUsers, workerGetUsersPage } from './workers';
import { TGetUsersPageAsync } from '../types';

export default function* watchMonitoring(): SagaIterator {
  yield takeEvery('MONIT_GET_LIST_USERS', getlistUsers);
  yield takeEvery<TGetUsersPageAsync>(
    'MONIT_GET_USERS_PAGE',
    workerGetUsersPage,
  );
}
