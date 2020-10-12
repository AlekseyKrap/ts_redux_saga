import { Provider } from 'react-redux';
import React from 'react';
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

import { TUseUserChange, useUserChange } from '../UserChange/hooks';
import { rootReducer } from '../../../../init/rootReducer';
import { middleware } from '../../../../init/middleware';
import { genReceivedData } from '../../../../workers/makeReqWithRD';
import { TUseUsersTPage, useUsersTPage } from '../UsersTPage/hooks';

function isReactChangeEvent(
  v: unknown,
): v is React.ChangeEvent<{ value: unknown }> {
  if (typeof v !== 'object' || v === null) return false;
  if (!('target' in v)) return false;
  return true;
}

describe('Monitoring -> Users -> UserChange -> hooks:', () => {
  let component: RenderHookResult<unknown, TUseUserChange>;
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
    component = renderHook(() => useUserChange(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
  });
  test('should describe  useEffect on first render', () => {
    expect(lastAction).toEqual({ type: 'monit/getListUsers' });
  });
  test('should describe set listUsers', () => {
    const listUsers = genReceivedData([
      {
        id: 1,
        login: 'User#1',
      },
      {
        id: 2,
        login: 'User#2',
      },
      {
        id: 3,
        login: 'User#3',
      },
    ]);
    act(() => {
      store.dispatch({ type: 'monit/listUsers', payload: listUsers });
    });
    expect(component.result.current.listUsers).toEqual(listUsers);
  });

  test('should describe  handleChange ', () => {
    act(() => {
      const event: unknown = { target: { value: '1' } };
      if (isReactChangeEvent(event)) {
        component.result.current.handleChange(event);
      }
    });
    expect(component.result.current.user).toBe('1');
    expect(lastAction).toEqual({ type: 'monit/getUsersPage', payload: '1' });
  });
});
describe('Monitoring -> Users -> UsersTPage -> hooks:', () => {
  let component: RenderHookResult<unknown, TUseUsersTPage>;
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
    component = renderHook(() => useUsersTPage(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
  });
  test('should describe  useEffect on first render', () => {
    expect(lastAction).toEqual({ type: 'monit/getUsersPage' });
  });
  test('should describe set listUsers', () => {
    const usersPage = genReceivedData([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
      {
        id: 2,
        usrId: 1,
        login: 'User#1',
        date: 1491625172450,
        page: 'page2',
      },
    ]);
    act(() => {
      store.dispatch({ type: 'monit/UsersPage', payload: usersPage });
    });
    expect(component.result.current.usersPage).toEqual(usersPage);
  });
});
