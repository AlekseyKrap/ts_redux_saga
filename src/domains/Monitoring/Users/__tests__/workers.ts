import { testSaga } from 'redux-saga-test-plan';

import { makeReqWithRD, TMakeReqWithRD } from '../../../../core/makeReqWithRD';
import {
  APIGetAllUsersPage,
  APIGetlistUsers,
  APIGetUsersPageById,
} from '../../../../api';
import {
  fillistUsers,
  fillUsersPage,
  workerGetlistUsers,
  workerGetUsersPage,
} from '../sagas/workers';
import { TGetUsersPageAsync } from '../types';

describe('Monitoring -> Employees -> saga -> workers:', () => {
  test('workerGetlistUsers saga', async () => {
    const saga = testSaga(workerGetlistUsers);

    saga.next().call(makeReqWithRD, {
      fetcher: APIGetlistUsers,
      fill: fillistUsers,
    });
    saga.next().isDone();
  });

  test('workerGetUsersPage saga payload === undefined', async () => {
    const data: TGetUsersPageAsync = {
      type: 'monit/getUsersPage',
    };

    const saga = testSaga(workerGetUsersPage, data);

    saga.next().call(makeReqWithRD, {
      fetcher: APIGetAllUsersPage,
      fill: fillUsersPage,
    });
    saga.next().isDone();
  });

  test('workerGetUsersPage saga payload === string', async () => {
    const data: TGetUsersPageAsync = {
      type: 'monit/getUsersPage',
      payload: '1',
    };

    const saga = testSaga(workerGetUsersPage, data);

    saga.next().call(makeReqWithRD, {
      fetcher: APIGetUsersPageById,
      fill: fillUsersPage,
      parameters: { field: 'usrId', value: data.payload },
    });
    saga.next().isDone();
  });
});
