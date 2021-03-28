import { testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from '@redux-saga/core/effects';
import {
  fillistUsers,
  workerGetlistUsers,
} from '../../domains/Monitoring/Users/sagas/workers';
import { makeReqWithRD, OptionsType, TMakeReqWithRD } from '../makeReqWithRD';
import { APIGetlistUsers, APIGetRoleList, TAPIlistUsersResp } from '../../api';
import { genFetchedData } from '../fetchedData';

describe('Core -> makeReqWithRD:', () => {
  test('makeReqWithRD  no error', async () => {
    const params: OptionsType<typeof APIGetlistUsers> = {
      fetcher: APIGetlistUsers,
      fill: fillistUsers,
    };
    const saga = testSaga<TMakeReqWithRD<typeof APIGetlistUsers>>(
      makeReqWithRD,
      params
    );
    let receivedData = genFetchedData<TAPIlistUsersResp>(null);
    saga.next().call(genFetchedData, null);
    receivedData = receivedData.set('isLoading', true);
    saga.next(receivedData).put(params.fill(receivedData));
    saga.next().call(params.fetcher, params.parameters);
    receivedData = receivedData.set('isLoading', false).set('LTU', Date.now());
    saga.next().put(params.fill(receivedData));
    saga.next().isDone();
  });
  test('makeReqWithRD  error', async () => {
    const params: OptionsType<typeof APIGetlistUsers> = {
      fetcher: APIGetlistUsers,
      fill: fillistUsers,
    };
    const expectedException = new Error('my expecting exception');
    const saga = testSaga<TMakeReqWithRD<typeof APIGetlistUsers>>(
      makeReqWithRD,
      params
    );
    let receivedData = genFetchedData<TAPIlistUsersResp>(null);
    saga.next().call(genFetchedData, null);
    receivedData = receivedData.set('isLoading', true);
    saga.next(receivedData).put(params.fill(receivedData));

    receivedData = receivedData.set('error', {
      isError: true,
      message: 'my expecting exception',
      code: undefined,
    });

    saga
      .next(receivedData)
      .throw(expectedException)
      .put(params.fill(receivedData));

    receivedData = receivedData.set('isLoading', false).set('LTU', Date.now());
    saga.next().put(params.fill(receivedData));
    saga.next().isDone();
  });
});
