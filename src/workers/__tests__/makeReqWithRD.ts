import { testSaga } from 'redux-saga-test-plan';
import { APIGetEmployeesDataById } from '../../api';
import {
  genReceivedData,
  makeReqWithRD,
  OptionsType,
  TMakeReqWithRD,
} from '../makeReqWithRD';
import { employeeData } from '../../domains/Monitoring/Employees/actions';

describe('genReceivedData:', () => {
  test('genReceivedData null ', () => {
    expect(genReceivedData(null).toObject()).toEqual({
      data: null,
      isLoading: false,
      LTU: 0,
      error: {
        isError: false,
        message: '',
      },
    });
  });
  test('genReceivedData [] ', () => {
    expect(genReceivedData([]).toObject()).toEqual({
      data: [],
      isLoading: false,
      LTU: 0,
      error: {
        isError: false,
        message: '',
      },
    });
  });
});
describe('worker makeReqWithRD:', () => {
  const opt: OptionsType<typeof APIGetEmployeesDataById> = {
    fetcher: APIGetEmployeesDataById,
    parameters: { value: '1' },
    fill: employeeData,
  };
  const result = { id: 1, role: 2, region: 1 };
  test('makeReqWithRD', () => {
    const saga = testSaga<TMakeReqWithRD<typeof APIGetEmployeesDataById>>(
      makeReqWithRD,
      opt
    );
    let receivedData = genReceivedData<typeof result>(null).set(
      'isLoading',
      true
    );
    saga.next(receivedData).call(genReceivedData, null);
    saga.next(receivedData).put(opt.fill(receivedData));
    saga.next().call(opt.fetcher, opt.parameters);
    receivedData = receivedData.set('data', result);
    saga.next(result).put(opt.fill(receivedData));
    receivedData = receivedData.set('isLoading', false).set('LTU', Date.now());
    saga.next().put(opt.fill(receivedData));
    saga.next().isDone();
  });
  test('makeReqWithRD request error', () => {
    const saga = testSaga<TMakeReqWithRD<typeof APIGetEmployeesDataById>>(
      makeReqWithRD,
      opt
    );
    let receivedData = genReceivedData<typeof result>(null).set(
      'isLoading',
      true
    );
    saga.next(receivedData).call(genReceivedData, null);
    saga.next(receivedData).put(opt.fill(receivedData));
    const error = new Error('error');
    receivedData = receivedData.set('error', {
      isError: true,
      message: error.message,
    });
    saga.next().throw(error).put(opt.fill(receivedData));
    receivedData = receivedData.set('isLoading', false).set('LTU', Date.now());
    saga.next().put(opt.fill(receivedData));
    saga.next().isDone();
  });
});
