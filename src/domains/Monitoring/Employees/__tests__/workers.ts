import { testSaga } from 'redux-saga-test-plan';
import { call } from '@redux-saga/core/effects';
import {
  getCatalogs,
  getEmployeeData,
  getlistEmployees,
  getRegionsList,
  getRoleList,
  fillEmployees,
  fillRoleList,
  fillRegionsList,
  fillData,
} from '../sagas/workers';
import {
  APIGetEmployeesDataById,
  APIGetlistEmployees,
  APIGetRegionsList,
  APIGetRoleList,
  TAPIRegionsList,
  TAPIRoleList,
} from '../../../../api';

import { TGetEmployeeDataByIdAsync } from '../types';
import { makeReqWithRD, TMakeReqWithRD } from '../../../../core/makeReqWithRD';
import { genFetchedData } from '../../../../core/fetchedData';

describe('Monitoring -> Employees -> saga -> workers:', () => {
  test('getlistEmployees saga', () => {
    const saga = testSaga(getlistEmployees);
    saga.next().call(makeReqWithRD, {
      fetcher: APIGetlistEmployees,
      fill: fillEmployees,
    });
    saga.next().isDone();
  });
  test('getCatalogs saga', async () => {
    const saga = testSaga(getCatalogs);

    saga.next().all([
      call<TMakeReqWithRD<typeof APIGetRoleList>>(makeReqWithRD, {
        fetcher: APIGetRoleList,
        fill: fillRoleList,
      }),
      call<TMakeReqWithRD<typeof APIGetRoleList>>(makeReqWithRD, {
        fetcher: APIGetRegionsList,
        fill: fillRegionsList,
      }),
    ]);

    saga.next().isDone();
  });
  test('getEmployeeData saga ,roleList & regionsList === []', async () => {
    const data: TGetEmployeeDataByIdAsync = {
      type: 'employees/getData',
      payload: '1',
    };

    const saga = testSaga(getEmployeeData, data);
    saga.next().select(getRoleList);
    saga.next(genFetchedData<TAPIRoleList>([])).select(getRegionsList);
    saga.next(genFetchedData<TAPIRegionsList>([])).call(getCatalogs);
    saga.next([]).call(makeReqWithRD, {
      fetcher: APIGetEmployeesDataById,
      fill: fillData,
      parameters: { value: data.payload },
    });
    saga.next().isDone();
  });
  test('getEmployeeData saga ,roleList & regionsList === data', async () => {
    const data: TGetEmployeeDataByIdAsync = {
      type: 'employees/getData',
      payload: '1',
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
    saga.next(genFetchedData<TAPIRegionsList>(roleList)).select(getRegionsList);
    saga.next(genFetchedData<TAPIRoleList>(regionsList)).call(makeReqWithRD, {
      fetcher: APIGetEmployeesDataById,
      fill: fillData,
      parameters: { value: data.payload },
    });
    saga.next().isDone();
  });
});
