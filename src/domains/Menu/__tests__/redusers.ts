import { Record } from 'immutable';
import { reducer, TRMenu, actions } from '../reduser';
import { TRActionsR } from '../../../types';

describe('menu reduser:', () => {
  const rInitRMenu = {
    isOpen: false,
  };
  const State = Record(rInitRMenu);
  const defState = new State();
  const defAction = {} as TRActionsR<TRMenu>;

  test('should describe initial state by default', () => {
    expect(reducer(undefined, defAction).hashCode()).toBe(defState.hashCode());
  });

  test('should update state value by key isOpen', () => {
    const action = actions.set('isOpen', true);
    const state = reducer(undefined, action);
    expect(state.get('isOpen')).toBe(true);
  });
});
