import type { SagaIterator } from '@redux-saga/core';
import { all, call, SagaReturnType, select } from '@redux-saga/core/effects';
import { makeReqWithRD, TMakeReqWithRD } from '../../../../core/makeReqWithRD';
import {
  APIGetEmployeesDataById,
  APIGetlistEmployees,
  APIGetRegionsList,
  APIGetRoleList,
  TAPIEmployeeData,
  TAPIlistEmployees,
  TAPIRegionsList,
  TAPIRoleList,
} from '../../../../api';
import type { TGetEmployeeDataByIdAsync } from '../types';
import { TREmployees, actions } from '../reduser';
import type { AppState } from '../../../../init/rootReducer';
import type { FetchedData } from '../../../../core/fetchedData';

export const getRoleList = ({
  employees_reducer,
}: AppState): TREmployees['RoleList'] => employees_reducer.get('RoleList');
export const getRegionsList = ({
  employees_reducer,
}: AppState): TREmployees['RegionsList'] =>
  employees_reducer.get('RegionsList');

export const fillEmployees = (v: FetchedData<TAPIlistEmployees>) =>
  actions.set('employees', v);

export const fillRoleList = (v: FetchedData<TAPIRoleList>) =>
  actions.set('RoleList', v);

export const fillRegionsList = (v: FetchedData<TAPIRegionsList>) =>
  actions.set('RegionsList', v);
export const fillData = (v: FetchedData<TAPIEmployeeData>) =>
  actions.set('Data', v);

export function* getlistEmployees(): SagaIterator<void> {
  try {
    yield call<TMakeReqWithRD<typeof APIGetlistEmployees>>(makeReqWithRD, {
      fetcher: APIGetlistEmployees,
      fill: fillEmployees,
    });
  } catch (e) {
    console.error({ e });
  }
}

export function* getCatalogs(): SagaIterator<void> {
  try {
    yield all([
      call<TMakeReqWithRD<typeof APIGetRoleList>>(makeReqWithRD, {
        fetcher: APIGetRoleList,
        fill: fillRoleList,
      }),
      call<TMakeReqWithRD<typeof APIGetRegionsList>>(makeReqWithRD, {
        fetcher: APIGetRegionsList,
        fill: fillRegionsList,
      }),
    ]);
  } catch (e) {
    console.error({ e });
  }
}

export function* getEmployeeData({
  payload,
}: TGetEmployeeDataByIdAsync): SagaIterator<void> {
  try {
    const roleList: SagaReturnType<typeof getRoleList> = yield select(
      getRoleList,
    );
    const regionsList: SagaReturnType<typeof getRegionsList> = yield select(
      getRegionsList,
    );

    if (
      roleList.get('data')?.length === 0 ||
      regionsList.get('data')?.length === 0
    ) {
      yield call(getCatalogs);
    }

    yield call<TMakeReqWithRD<typeof APIGetEmployeesDataById>>(makeReqWithRD, {
      fetcher: APIGetEmployeesDataById,
      fill: fillData,
      parameters: { value: payload },
    });
  } catch (e) {
    console.error({ e });
  }
}
