import type { SagaIterator } from '@redux-saga/core';
import { takeEvery } from 'redux-saga/effects';
import { workerGetlistUsers, workerGetUsersPage } from './workers';
import type { TGetUsersPageAsync } from '../types';

export default function* watchMonitoring(): SagaIterator {
  yield takeEvery('monit/getListUsers', workerGetlistUsers);
  yield takeEvery<TGetUsersPageAsync>('monit/getUsersPage', workerGetUsersPage);
}
