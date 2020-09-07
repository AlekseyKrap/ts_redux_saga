import { SagaIterator } from '@redux-saga/core';
import {
  all,
  call,
  put,
  SagaReturnType,
  select,
} from '@redux-saga/core/effects';
import {
  makeRequestWithSpinner,
  OptionsType,
  TmakeRequestWithSpinner,
} from '../../../../workers/makeRequestWithSpinner';
import {
  employeeData,
  employeesDataEr,
  employeeslist,
  fetchEmployeeData,
  fetchingEmployeesList,
  setErrorEmployees,
} from '../actions';
import {
  APIGetEmployeesDataById,
  APIGetlistEmployees,
  APIGetRegionsList,
  APIGetRoleList,
} from '../../../../api';
import { TGetEmployeeDataByIdAsync } from '../types';
import { TEmployeesMergeAction, TR_Employees } from '../reduser';
import { AppState } from '../../../../init/rootReducer';

const getRoleList = ({
  employees_reducer,
}: AppState): TR_Employees['employees_RoleList'] => employees_reducer.get('employees_RoleList');
const getRegionsList = ({
  employees_reducer,
}: AppState): TR_Employees['employees_RegionsList'] => employees_reducer.get('employees_RegionsList');

export function* getlistEmployees(): SagaIterator<void> {
  try {
    const opt: OptionsType = {
      fetcher: APIGetlistEmployees,
      isFetching: fetchingEmployeesList,
      fill: employeeslist,
      setErrorAction: setErrorEmployees,
    };

    yield call<TmakeRequestWithSpinner>(makeRequestWithSpinner, opt);
  } catch (e) {
    console.error({ e });
  }
}

function* getCatalogs(): SagaIterator<void> {
  try {
    type TCatalogs = {
      roleList: SagaReturnType<typeof APIGetRoleList>;
      regionsList: SagaReturnType<typeof APIGetRegionsList>;
    };
    const { roleList, regionsList }: TCatalogs = yield all({
      roleList: call(APIGetRoleList),
      regionsList: call(APIGetRegionsList),
    });

    const mergeAction: TEmployeesMergeAction = {
      type: 'EMPLOYEES_MERGE',
      payload: {
        employees_RoleList: roleList,
        employees_RegionsList: regionsList,
      },
    };

    yield put<TEmployeesMergeAction>(mergeAction);
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

    const opt: OptionsType = {
      fetcher: APIGetEmployeesDataById,
      parameters: { value: payload },
      isFetching: fetchEmployeeData,
      fill: employeeData,
      setErrorAction: employeesDataEr,
    };

    yield call<TmakeRequestWithSpinner>(makeRequestWithSpinner, opt);
  } catch (e) {
    console.error({ e });
  }
}
