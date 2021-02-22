import { SagaIterator } from '@redux-saga/core';
import { all, call, SagaReturnType, select } from '@redux-saga/core/effects';
import { makeReqWithRD, TMakeReqWithRD } from '../../../../core/makeReqWithRD';
import {
  APIGetEmployeesDataById,
  APIGetlistEmployees,
  APIGetRegionsList,
  APIGetRoleList,
} from '../../../../api';
import { TGetEmployeeDataByIdAsync } from '../types';
import { TREmployees, actions } from '../reduser';
import { AppState } from '../../../../init/rootReducer';

export const getRoleList = ({
  employees_reducer,
}: AppState): TREmployees['RoleList'] => employees_reducer.get('RoleList');
export const getRegionsList = ({
  employees_reducer,
}: AppState): TREmployees['RegionsList'] =>
  employees_reducer.get('RegionsList');

export function* getlistEmployees(): SagaIterator<void> {
  try {
    yield call<TMakeReqWithRD<typeof APIGetlistEmployees>>(makeReqWithRD, {
      fetcher: APIGetlistEmployees,
      fill: (v) => actions.set('employees', v),
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
        fill: (v) => actions.set('RoleList', v),
      }),
      call<TMakeReqWithRD<typeof APIGetRegionsList>>(makeReqWithRD, {
        fetcher: APIGetRegionsList,
        fill: (v) => actions.set('RegionsList', v),
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
      fill: (v) => actions.set('Data', v),
      parameters: { value: payload },
    });
  } catch (e) {
    console.error({ e });
  }
}
