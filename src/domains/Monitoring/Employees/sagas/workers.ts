import { SagaIterator } from '@redux-saga/core';
import {
  all,
  call,
  put,
  SagaReturnType,
  select,
} from '@redux-saga/core/effects';
import {
  makeReqWithRD,
  TMakeReqWithRD,
} from '../../../../workers/makeReqWithRD';
import { employeeData, employeeslist } from '../actions';
import {
  APIGetEmployeesDataById,
  APIGetlistEmployees,
  APIGetRegionsList,
  APIGetRoleList,
} from '../../../../api';
import { TGetEmployeeDataByIdAsync } from '../types';
import { TAEmployeesMerge, TREmployees } from '../reduser';
import { AppState } from '../../../../init/rootReducer';

export const getRoleList = ({
  employees_reducer,
}: AppState): TREmployees['employees/RoleList'] => employees_reducer.get('employees/RoleList');
export const getRegionsList = ({
  employees_reducer,
}: AppState): TREmployees['employees/RegionsList'] => employees_reducer.get('employees/RegionsList');

export function* getlistEmployees(): SagaIterator<void> {
  try {
    yield call<TMakeReqWithRD<typeof APIGetlistEmployees>>(makeReqWithRD, {
      fetcher: APIGetlistEmployees,
      fill: employeeslist,
    });
  } catch (e) {
    console.error({ e });
  }
}

export function* getCatalogs(): SagaIterator<void> {
  try {
    type TCatalogs = {
      roleList: SagaReturnType<typeof APIGetRoleList>;
      regionsList: SagaReturnType<typeof APIGetRegionsList>;
    };
    const { roleList, regionsList }: TCatalogs = yield all({
      roleList: call(APIGetRoleList),
      regionsList: call(APIGetRegionsList),
    });

    const mergeAction: TAEmployeesMerge = {
      type: 'employees/merge',
      payload: {
        'employees/RoleList': roleList,
        'employees/RegionsList': regionsList,
      },
    };

    yield put<TAEmployeesMerge>(mergeAction);
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

    if (roleList.length === 0 || regionsList.length === 0) {
      yield call(getCatalogs);
    }

    yield call<TMakeReqWithRD<typeof APIGetEmployeesDataById>>(makeReqWithRD, {
      fetcher: APIGetEmployeesDataById,
      fill: employeeData,
      parameters: { value: payload },
    });
  } catch (e) {
    console.error({ e });
  }
}
