import { Record } from 'immutable';
import {
  employees_reducer,
  TEmployeesClearAction,
  TEmployeesClearActionALL,
  TEmployeesMergeAction,
} from '../reduser';
import {
  TAEmployeeData,
  TAEmployees_Er,
  TAEmployeesDataEr,
  TAEmployeeslist,
  TAFetchEmployeeData,
  TAFetchEmployeesList,
  TARegionsList,
  TARoleList,
} from '../types';

describe('Monitoring -> Employees -> reduser:', () => {
  const rInitREmployees = {
    employees: [],
    employees_IsLoading: false,
    employees_Er: {
      error: false,
      message: '',
    },
    employees_RoleList: [],
    employees_RegionsList: [],
    employess_Data: null,
    employess_Data_IsLoading: false,
    employess_Data_Er: {
      error: false,
      message: '',
    },
  };
  const State = Record(rInitREmployees);
  const defState = new State();

  const defAction: any = {};

  test('should describe initial state by default', () => {
    expect(JSON.stringify(employees_reducer(undefined, defAction))).toBe(
      JSON.stringify(defState),
    );
  });

  test('should update state value by key employees', () => {
    const action: TAEmployeeslist = {
      type: 'employees',
      payload: [{ id: 1, fullName: 'Joey Tribbiani' }],
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees')).toEqual([
      { id: 1, fullName: 'Joey Tribbiani' },
    ]);
  });
  test('should update state value by key employees_IsLoading', () => {
    const action: TAFetchEmployeesList = {
      type: 'employees_IsLoading',
      payload: true,
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees_IsLoading')).toEqual(true);
  });
  test('should update state value by key employees_Er', () => {
    const action: TAEmployees_Er = {
      type: 'employees_Er',
      payload: { error: true, message: 'Error' },
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees_Er')).toEqual({
      error: true,
      message: 'Error',
    });
  });
  test('should update state value by key employees_RoleList', () => {
    const action: TARoleList = {
      type: 'employees_RoleList',
      payload: [{ id: 1, description: 'administrator' }],
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees_RoleList')).toEqual([
      { id: 1, description: 'administrator' },
    ]);
  });
  test('should update state value by key employees_RegionsList', () => {
    const action: TARegionsList = {
      type: 'employees_RegionsList',
      payload: [{ id: 1, description: 'central' }],
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees_RegionsList')).toEqual([
      { id: 1, description: 'central' },
    ]);
  });
  test('should update state value by key employess_Data', () => {
    const action: TAEmployeeData = {
      type: 'employess_Data',
      payload: { id: 1, role: 2, region: 1 },
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employess_Data')).toEqual({ id: 1, role: 2, region: 1 });
  });
  test('should update state value by key employess_Data_IsLoading', () => {
    const action: TAFetchEmployeeData = {
      type: 'employess_Data_IsLoading',
      payload: true,
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employess_Data_IsLoading')).toEqual(true);
  });
  test('should update state value by key employess_Data_Er', () => {
    const action: TAEmployeesDataEr = {
      type: 'employess_Data_Er',
      payload: { error: true, message: 'Error' },
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employess_Data_Er')).toEqual({
      error: true,
      message: 'Error',
    });
  });
  test('should update state value by action EMPLOYEES_CLEAR', () => {
    const actionClear: TEmployeesClearAction = {
      type: 'EMPLOYEES_CLEAR',
      payload: 'employess_Data_IsLoading',
    };
    const actionIsLoading: TAFetchEmployeeData = {
      type: 'employess_Data_IsLoading',
      payload: true,
    };
    const stateStep1 = employees_reducer(undefined, actionIsLoading);
    expect(stateStep1.get('employess_Data_IsLoading')).toEqual(true);
    const stateStep2 = employees_reducer(stateStep1, actionClear);
    expect(stateStep2.get('employess_Data_IsLoading')).toEqual(false);
  });
  test('should update state value by action EMPLOYEES_CLEAR_ALL', () => {
    const actionClearAll: TEmployeesClearActionALL = {
      type: 'EMPLOYEES_CLEAR_ALL',
    };
    const actionIsLoading: TAFetchEmployeeData = {
      type: 'employess_Data_IsLoading',
      payload: true,
    };
    const stateStep1 = employees_reducer(undefined, actionIsLoading);
    expect(stateStep1.get('employess_Data_IsLoading')).toEqual(true);
    const stateStep2 = employees_reducer(stateStep1, actionClearAll);
    expect(JSON.stringify(stateStep2)).toBe(JSON.stringify(defState));
  });
  test('should update state value by action EMPLOYEES_MERGE', () => {
    const action: TEmployeesMergeAction = {
      type: 'EMPLOYEES_MERGE',
      payload: {
        employees_RoleList: [{ id: 1, description: 'administrator' }],
        employees_RegionsList: [{ id: 1, description: 'central' }],
      },
    };
    const state = employees_reducer(undefined, action);
    expect(state.get('employees_RoleList')).toEqual([
      { id: 1, description: 'administrator' },
    ]);
    expect(state.get('employees_RegionsList')).toEqual([
      { id: 1, description: 'central' },
    ]);
  });
});
