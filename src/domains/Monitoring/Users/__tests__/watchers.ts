import { testSaga } from 'redux-saga-test-plan';
import watchMonitoring from '../sagas/watchers';
import { workerGetlistUsers, workerGetUsersPage } from '../sagas/workers';

describe('Monitoring -> Users -> saga -> watchers:', () => {
  test('should describe watcher', () => {
    testSaga(watchMonitoring)
      .next()
      .takeEvery('monit/getListUsers', workerGetlistUsers)
      .next()
      .takeEvery('monit/getUsersPage', workerGetUsersPage)
      .finish()
      .isDone();
  });
});
