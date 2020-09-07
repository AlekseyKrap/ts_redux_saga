import { SagaIterator } from '@redux-saga/core';
import { takeEvery } from 'redux-saga/effects';
import { getEmployeeData, getlistEmployees } from './workers';
import { TGetEmployeeDataByIdAsync } from '../types';

export default function* watchMonitoring(): SagaIterator {
  yield takeEvery('EMPLOYEES_GET_LIST', getlistEmployees);
  yield takeEvery<TGetEmployeeDataByIdAsync>(
    'EMPLOYEES_GET_DATA',
    getEmployeeData,
  );
}
