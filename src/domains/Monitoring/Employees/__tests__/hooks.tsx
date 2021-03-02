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
  Store,
} from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { rootReducer } from '../../../../init/rootReducer';
import { middleware } from '../../../../init/middleware';
import { TUseEmployeess, useEmployeess } from '../hooks';
import {
  TAPIEmployeeData,
  TAPIlistEmployees,
  TAPIRegionsList,
  TAPIRoleList,
} from '../../../../api';
import { genFetchedData } from '../../../../core/fetchedData';
import { actions } from '../reduser';

function isReactChangeEvent(
  v: unknown,
): v is React.ChangeEvent<{ value: unknown }> {
  if (typeof v !== 'object' || v === null) return false;
  if (!('target' in v)) return false;
  return true;
}

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
    expect(lastAction).toEqual({ type: 'employees/getList' });
  });
  test('should describe  useEffect on unmount', () => {
    component.unmount();
    expect(lastAction).toEqual({ type: 'employees/clearAll' });
  });
  test('should describe  useEffect on employess data', () => {
    act(() => {
      store.dispatch(
        actions.set(
          'Data',
          genFetchedData<TAPIEmployeeData>({
            id: 3,
            role: 3,
            region: 4,
          }),
        ),
      );
    });

    expect(component.result.current.role).toBe('3');
    expect(component.result.current.region).toBe('4');
  });

  test('should describe a employee change ', () => {
    act(() => {
      const event: unknown = { target: { value: '2' } };
      if (isReactChangeEvent(event)) {
        component.result.current.changeEmployee(event);
      }
    });
    expect(component.result.current.employee).toBe('2');
    expect(lastAction).toEqual({ type: 'employees/getData', payload: '2' });
  });
  test('should describe set employeesList', () => {
    const employeesList = [
      { id: 1, fullName: 'Joey Tribbiani' },
      { id: 2, fullName: 'Chandler Bing' },
    ];
    act(() => {
      store.dispatch(
        actions.set(
          'employees',
          genFetchedData<TAPIlistEmployees>(employeesList),
        ),
      );
    });
    expect(component.result.current.employeesList.get('data')).toEqual(
      employeesList,
    );
  });

  test('should describe  changeRole ', () => {
    act(() => {
      const event: unknown = { target: { value: '1' } };
      if (isReactChangeEvent(event)) {
        component.result.current.changeRole(event);
      }
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
      store.dispatch(
        actions.set('RoleList', genFetchedData<TAPIRoleList>(roleList)),
      );
    });
    expect(component.result.current.roleList.get('data')).toEqual(roleList);
  });
  test('should describe  changeRegion ', () => {
    act(() => {
      const event: unknown = { target: { value: '7' } };
      if (isReactChangeEvent(event)) {
        component.result.current.changeRegion(event);
      }
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
      store.dispatch(
        actions.set(
          'RegionsList',
          genFetchedData<TAPIRegionsList>(regionsList),
        ),
      );
    });
    expect(component.result.current.regionsList.get('data')).toEqual(
      regionsList,
    );
  });
});
