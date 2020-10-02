import { expectSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  APIGetEmployeesDataById,
  APIGetRegionsList,
  APIGetRoleList,
} from '../../api';
import { makeRequestWithSpinner, OptionsType } from '../makeRequestWithSpinner';
import {
  employeeData,
  employeesDataEr,
  fetchEmployeeData,
} from '../../domains/Monitoring/Employees/actions';

describe('worker makeRequestWithSpinner:', () => {
  const opt: OptionsType = {
    fetcher: APIGetEmployeesDataById,
    parameters: { value: '1' },
    isFetching: fetchEmployeeData,
    fill: employeeData,
    setErrorAction: employeesDataEr,
  };
  const result = { id: 1, role: 2, region: 1 };
  test('makeRequestWithSpinner', async () => {
    await expectSaga(makeRequestWithSpinner, opt)
      .put(opt.isFetching(true))
      .put(opt.setErrorAction(false, ''))
      .provide([[call(opt.fetcher, opt.parameters), result]])
      .put(opt.fill(result))
      .put({ type: 'employess_Data_IsLoading', payload: false })
      .run();
  });
  test('makeRequestWithSpinner request error', async () => {
    const error = new Error('error');

    await expectSaga(makeRequestWithSpinner, opt)
      .put(opt.isFetching(true))
      .put(opt.setErrorAction(false, ''))
      .provide([[call(opt.fetcher, opt.parameters), throwError(error)]])
      .not.put(opt.fill(result))
      .put(opt.setErrorAction(true, error.message))
      .put({ type: 'employess_Data_IsLoading', payload: false })
      .run();
  });
});
