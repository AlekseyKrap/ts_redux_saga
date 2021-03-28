import type { SagaIterator } from '@redux-saga/core';
import { takeEvery } from 'redux-saga/effects';
import { getEmployeeData, getlistEmployees } from './workers';
import type { TGetEmployeeDataByIdAsync } from '../types';

export default function* watchMonitoring(): SagaIterator {
  yield takeEvery('employees/getList', getlistEmployees);
  yield takeEvery<TGetEmployeeDataByIdAsync>(
    'employees/getData',
    getEmployeeData
  );
}
