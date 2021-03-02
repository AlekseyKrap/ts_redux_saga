import { Record } from 'immutable';
import { TREmployees, actions, reducer } from '../reduser';

import {
  TAPIEmployeeData,
  TAPIlistEmployees,
  TAPIRegionsList,
  TAPIRoleList,
} from '../../../../api';
import { genFetchedData } from '../../../../core/fetchedData';

describe('Monitoring -> Employees -> reduser:', () => {
  const rInitREmployees: TREmployees = {
    employees: genFetchedData<TAPIlistEmployees>(null),
    RoleList: genFetchedData<TAPIRoleList>([]),
    RegionsList: genFetchedData<TAPIRegionsList>([]),
    Data: genFetchedData<TAPIEmployeeData>(null),
  };
  const State = Record(rInitREmployees);
  const defState = new State();

  test('should update state value by key employees', () => {
    const payload = genFetchedData<TAPIlistEmployees>([
      { id: 1, fullName: 'Joey Tribbiani' },
    ]);

    const action = actions.set('employees', payload);
    const state = reducer(undefined, action);
    expect(state.get('employees')).toEqual(payload);
  });

  test('should update state value by key employees/RoleList', () => {
    const action = actions.set(
      'RoleList',
      genFetchedData<TAPIRoleList>([{ id: 1, description: 'administrator' }]),
    );
    const state = reducer(undefined, action);
    expect(state.get('RoleList').get('data')).toEqual([
      { id: 1, description: 'administrator' },
    ]);
  });

  test('should update state value by key employees/RegionsList', () => {
    const payload = genFetchedData<TAPIRegionsList>([
      { id: 1, description: 'central' },
    ]);

    const action = actions.set('RegionsList', payload);
    const state = reducer(undefined, action);
    expect(state.get('RegionsList')).toEqual(payload);
  });

  test('should update state value by key employess/Data', () => {
    const payload = genFetchedData<TAPIEmployeeData>({
      id: 1,
      role: 2,
      region: 1,
    });
    const action = actions.set('Data', payload);
    const state = reducer(undefined, action);
    expect(state.get('Data')).toEqual(payload);
  });

  test('should update state value by action employees/clear', () => {
    const payload = genFetchedData<TAPIEmployeeData>({
      id: 1,
      role: 2,
      region: 1,
    });
    const action = actions.set('Data', payload);
    const state = reducer(undefined, action);
    expect(state.get('Data')).toEqual(payload);
    const action2 = actions.clear('Data');
    const state2 = reducer(state, action2);
    expect(state2.get('Data').get('data')).toEqual(null);
  });
  test('should update state value by action employees/clearAll', () => {
    const payload = genFetchedData<TAPIEmployeeData>({
      id: 1,
      role: 2,
      region: 1,
    });
    const action = actions.set('Data', payload);
    const state = reducer(undefined, action);
    expect(state.get('Data')).toEqual(payload);
    const action2 = actions.clearAll();
    const state2 = reducer(state, action2);
    expect(state2.get('Data').get('data')).toEqual(null);
    expect(JSON.stringify(state2)).toBe(JSON.stringify(defState));
  });
});
