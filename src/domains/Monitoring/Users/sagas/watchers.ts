import { SagaIterator } from '@redux-saga/core';
import { takeEvery } from 'redux-saga/effects';
import { workerGetlistUsers, workerGetUsersPage } from './workers';
import { TGetUsersPageAsync } from '../types';

export default function* watchMonitoring(): SagaIterator {
  yield takeEvery('monit/getListUsers', workerGetlistUsers);
  yield takeEvery<TGetUsersPageAsync>('monit/getUsersPage', workerGetUsersPage);
}
