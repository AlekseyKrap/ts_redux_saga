import { testSaga } from 'redux-saga-test-plan';
import watchMonitoring from '../sagas/watchers';
import { getEmployeeData, getlistEmployees } from '../sagas/workers';

describe('Monitoring -> Employees -> saga -> watchers:', () => {
  test('should describe watcher', () => {
    testSaga(watchMonitoring)
      .next()
      .takeEvery('employees/getList', getlistEmployees)
      .next()
      .takeEvery('employees/getData', getEmployeeData)
      .finish()
      .isDone();
  });
});
