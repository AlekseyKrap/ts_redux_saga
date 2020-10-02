import React from 'react';
import {
  renderHook,
  act,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { TUseMenu, useMenu } from '../Hooks';
import { rootReducer } from '../../../init/rootReducer';
import { middleware } from '../../../init/middleware';

describe('menu hooks:', () => {
  let component: RenderHookResult<unknown, TUseMenu>;
  beforeEach(() => {
    const store = createStore(rootReducer, applyMiddleware(...middleware));
    component = renderHook(() => useMenu(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
  });

  test('should describe a open menu', () => {
    act(() => {
      component.result.current.handleDrawerOpen();
    });
    expect(component.result.current.open).toBe(true);
  });
  test('should describe a closed menu by default', () => {
    expect(component.result.current.open).toBe(false);
  });
  test('should describe a close menu', () => {
    act(() => {
      component.result.current.handleDrawerClose();
    });
    expect(component.result.current.open).toBe(false);
  });
});
