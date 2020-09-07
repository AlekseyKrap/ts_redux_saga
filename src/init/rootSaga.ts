// Core
import { all, fork } from 'redux-saga/effects';

// Watchers
import watchMonitoring from '../domains/Monitoring/Users/sagas/watchers';
import watchEmployees from '../domains/Monitoring/Employees/sagas/watchers';

export function* rootSaga(): Generator {
  yield all([fork(watchMonitoring), fork(watchEmployees)]);
}
