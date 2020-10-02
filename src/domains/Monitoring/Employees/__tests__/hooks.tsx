import {
  act,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';
import {
  Action,
  AnyAction,
  applyMiddleware,
  createStore,
  Dispatch,
  MiddlewareAPI,
  Store,
} from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { rootReducer } from '../../../../init/rootReducer';
import { middleware } from '../../../../init/middleware';
import { TUseEmployeess, useEmployeess } from '../hooks';

describe('Monitoring -> Employees -> hooks:', () => {
  let component: RenderHookResult<unknown, TUseEmployeess>;
  let store: Store<unknown, Action>;
  let lastAction: Action;
  function testActions() {
    return (next: Dispatch<AnyAction>) => (action: Action) => {
      lastAction = action;
      const returnValue = next(action);
      return returnValue;
    };
  }
  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(...middleware, testActions),
    );
    component = renderHook(() => useEmployeess(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
  });
  test('should describe  useEffect on first render', () => {
    expect(lastAction).toEqual({ type: 'EMPLOYEES_GET_LIST' });
  });
  test('should describe  useEffect on unmount', () => {
    component.unmount();
    expect(lastAction).toEqual({ type: 'EMPLOYEES_CLEAR_ALL' });
  });
  test('should describe  useEffect on employess data', () => {
    act(() => {
      store.dispatch({
        type: 'employess_Data',
        payload: { id: 3, role: 3, region: 4 },
      });
    });
    expect(component.result.current.role).toBe('3');
    expect(component.result.current.region).toBe('4');
  });
  test('should describe  employeesIsLoading by default', () => {
    expect(component.result.current.employeesIsLoading).toBe(false);
  });
  test('should describe  employeesEr by default', () => {
    expect(component.result.current.employeesEr).toEqual({
      error: false,
      message: '',
    });
  });
  test('should describe a employee change ', () => {
    act(() => {
      const event: any = { target: { value: '2' } };
      component.result.current.changeEmployee(event);
    });
    expect(component.result.current.employee).toBe('2');
    expect(lastAction).toEqual({ type: 'EMPLOYEES_GET_DATA', payload: '2' });
  });
  test('should describe set employeesList', () => {
    const employeesList = [
      { id: 1, fullName: 'Joey Tribbiani' },
      { id: 2, fullName: 'Chandler Bing' },
    ];
    act(() => {
      store.dispatch({ type: 'employees', payload: employeesList });
    });
    expect(component.result.current.employeesList).toEqual(employeesList);
  });
  test('should describe set dataIsLoading', () => {
    act(() => {
      store.dispatch({ type: 'employess_Data_IsLoading', payload: true });
    });
    expect(component.result.current.dataIsLoading).toBe(true);
  });

  test('should describe  changeRole ', () => {
    act(() => {
      const event: any = { target: { value: '1' } };
      component.result.current.changeRole(event);
    });
    expect(component.result.current.role).toBe('1');
  });
  test('should describe set roleList', () => {
    const roleList = [
      { id: 1, description: 'administrator' },
      { id: 2, description: 'manager' },
      { id: 3, description: 'operator' },
    ];
    act(() => {
      store.dispatch({ type: 'employees_RoleList', payload: roleList });
    });
    expect(component.result.current.roleList).toEqual(roleList);
  });
  test('should describe  changeRegion ', () => {
    act(() => {
      const event: any = { target: { value: '7' } };
      component.result.current.changeRegion(event);
    });
    expect(component.result.current.region).toBe('7');
  });
  test('should describe set regionsList', () => {
    const regionsList = [
      { id: 1, description: 'central' },
      { id: 2, description: 'west' },
      { id: 3, description: 'eastern' },
    ];
    act(() => {
      store.dispatch({ type: 'employees_RegionsList', payload: regionsList });
    });
    expect(component.result.current.regionsList).toEqual(regionsList);
  });
});
