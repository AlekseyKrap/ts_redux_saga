import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import {
  getCatalogs,
  getEmployeeData,
  getlistEmployees,
  getRegionsList,
  getRoleList,
} from '../sagas/workers';
import {
  APIGetEmployeesDataById,
  APIGetlistEmployees,
  APIGetRegionsList,
  APIGetRoleList,
} from '../../../../api';
import { makeReqWithRD, OptionsType } from '../../../../workers/makeReqWithRD';
import { employeeData, employeeslist } from '../actions';
import { TGetEmployeeDataByIdAsync } from '../types';

describe('Monitoring -> Employees -> saga -> workers:', () => {
  test('getlistEmployees saga', () => {
    const opt = {
      fetcher: APIGetlistEmployees,
      fill: employeeslist,
    };
    const saga = testSaga(getlistEmployees);
    saga.next().call(makeReqWithRD, opt);
    saga.next().isDone();
  });
  test('getCatalogs saga', async () => {
    const roleList = [
      { id: 1, description: 'administrator' },
      { id: 2, description: 'manager' },
      { id: 3, description: 'operator' },
    ];
    const regionsList = [
      { id: 1, description: 'central' },
      { id: 2, description: 'west' },
      { id: 3, description: 'eastern' },
      { id: 4, description: 'northern' },
    ];
    const mergeAction = {
      type: 'employees/merge',
      payload: {
        'employees/RoleList': roleList,
        'employees/RegionsList': regionsList,
      },
    };

    await expectSaga(getCatalogs)
      .provide([
        [call(APIGetRoleList), roleList],
        [call(APIGetRegionsList), regionsList],
      ])
      .put(mergeAction)
      .run();
  });
  test('getEmployeeData saga ,roleList & regionsList === []', async () => {
    const data: TGetEmployeeDataByIdAsync = {
      type: 'employees/getData',
      payload: '1',
    };
    const opt: OptionsType<typeof APIGetEmployeesDataById> = {
      fetcher: APIGetEmployeesDataById,
      parameters: { value: data.payload },
      fill: employeeData,
    };
    const saga = testSaga(getEmployeeData, data);
    saga.next().select(getRoleList);
    saga.next([]).select(getRegionsList);
    saga.next([]).call(getCatalogs);
    saga.next([]).call(makeReqWithRD, opt);
    saga.next().isDone();
  });
  test('getEmployeeData saga ,roleList & regionsList === data', async () => {
    const data: TGetEmployeeDataByIdAsync = {
      type: 'employees/getData',
      payload: '1',
    };
    const opt: OptionsType<typeof APIGetEmployeesDataById> = {
      fetcher: APIGetEmployeesDataById,
      parameters: { value: data.payload },
      fill: employeeData,
    };
    const roleList = [
      { id: 1, description: 'administrator' },
      { id: 2, description: 'manager' },
      { id: 3, description: 'operator' },
    ];
    const regionsList = [
      { id: 1, description: 'central' },
      { id: 2, description: 'west' },
      { id: 3, description: 'eastern' },
      { id: 4, description: 'northern' },
    ];
    const saga = testSaga(getEmployeeData, data);
    saga.next().select(getRoleList);
    saga.next(roleList).select(getRegionsList);
    saga.next(regionsList).call(makeReqWithRD, opt);
    saga.next().isDone();
  });
});
