import { testSaga } from 'redux-saga-test-plan';
import {
  fillistUsers,
  workerGetlistUsers,
} from '../../domains/Monitoring/Users/sagas/workers';
import { makeReqWithRD, OptionsType, TMakeReqWithRD } from '../makeReqWithRD';
import { APIGetlistUsers, TAPIlistUsersResp } from '../../api';
import { genFetchedData } from '../fetchedData';

describe('Core -> makeReqWithRD:', () => {
  test('makeReqWithRD', async () => {
    const params: OptionsType<typeof APIGetlistUsers> = {
      fetcher: APIGetlistUsers,
      fill: fillistUsers,
    };
    const saga = testSaga<TMakeReqWithRD<typeof APIGetlistUsers>>(
      makeReqWithRD,
      params,
    );
    saga.next().call(genFetchedData, null);

    saga
      .next(genFetchedData<TAPIlistUsersResp>(null))
      .put(params.fill(genFetchedData<TAPIlistUsersResp>(null)));

    saga.next().isDone();
  });
});
