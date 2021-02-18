import { Record } from 'immutable';
import {
  employees_reducer,
  TActionsR_Employees,
  TAEmployeesClear,
  TAEmployeesClearALL,
  TAEmployeesMerge,
  TREmployees,
} from '../reduser';
import {
  TAEmployeeData,
  TAEmployeeslist,
  TARegionsList,
  TARoleList,
} from '../types';
import { genReceivedData } from '../../../../workers/makeReqWithRD';
import { TAPIEmployeeData, TAPIlistEmployees } from '../../../../api';

describe('Monitoring -> Employees -> reduser:', () => {
  const rInitREmployees: TREmployees = {
    employees: genReceivedData<TAPIlistEmployees>([]),
    'employees/RoleList': [],
    'employees/RegionsList': [],
    'employess/Data': genReceivedData<TAPIEmployeeData>(null),
  };
  const State = Record(rInitREmployees);
  const defState = new State();

  const defAction = {} as TActionsR_Employees;

  test('should describe initial state by default', () => {
    expect(JSON.stringify(employees_reducer(undefined, defAction))).toBe(
      JSON.stringify(defState)
    );
  });

  test('should update state value by key employees', () => {
    const payload = genReceivedData<TAPIlistEmployees>([
      { id: 1, fullName: 'Joey Tribbiani' },
    ]);
    const action: TAEmployeeslist = {
      type: 'employees',
      payload,
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees')).toEqual(payload);
  });

  test('should update state value by key employees/RoleList', () => {
    const action: TARoleList = {
      type: 'employees/RoleList',
      payload: [{ id: 1, description: 'administrator' }],
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees/RoleList')).toEqual([
      { id: 1, description: 'administrator' },
    ]);
  });
  test('should update state value by key employees/RegionsList', () => {
    const action: TARegionsList = {
      type: 'employees/RegionsList',
      payload: [{ id: 1, description: 'central' }],
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees/RegionsList')).toEqual([
      { id: 1, description: 'central' },
    ]);
  });
  test('should update state value by key employess/Data', () => {
    const payload = genReceivedData<TAPIEmployeeData>({
      id: 1,
      role: 2,
      region: 1,
    });
    const action: TAEmployeeData = {
      type: 'employess/Data',
      payload,
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employess/Data')).toEqual(payload);
  });

  test('should update state value by action employees/clear', () => {
    const actionClear: TAEmployeesClear = {
      type: 'employees/clear',
      payload: 'employess/Data',
    };
    const actionEmployessData: TAEmployeeData = {
      type: 'employess/Data',
      payload: genReceivedData<TAPIEmployeeData>({ id: 1, role: 2, region: 1 }),
    };
    const stateStep1 = employees_reducer(undefined, actionEmployessData);
    expect(stateStep1.get('employess/Data').get('data')).toEqual({
      id: 1,
      role: 2,
      region: 1,
    });
    const stateStep2 = employees_reducer(stateStep1, actionClear);
    expect(stateStep2.get('employess/Data').get('data')).toEqual(null);
  });
  test('should update state value by action employees/clearAll', () => {
    const actionClearAll: TAEmployeesClearALL = {
      type: 'employees/clearAll',
    };
    const actionRegionsList: TARegionsList = {
      type: 'employees/RegionsList',
      payload: [{ id: 1, description: 'central' }],
    };

    const stateStep1 = employees_reducer(undefined, actionRegionsList);
    expect(stateStep1.get('employees/RegionsList')).toEqual([
      { id: 1, description: 'central' },
    ]);
    const stateStep2 = employees_reducer(stateStep1, actionClearAll);
    expect(JSON.stringify(stateStep2)).toBe(JSON.stringify(defState));
  });
  test('should update state value by action employees/merge', () => {
    const action: TAEmployeesMerge = {
      type: 'employees/merge',
      payload: {
        'employees/RoleList': [{ id: 1, description: 'administrator' }],
        'employees/RegionsList': [{ id: 1, description: 'central' }],
      },
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees/RoleList')).toEqual([
      { id: 1, description: 'administrator' },
    ]);
    expect(state.get('employees/RegionsList')).toEqual([
      { id: 1, description: 'central' },
    ]);
  });
});
