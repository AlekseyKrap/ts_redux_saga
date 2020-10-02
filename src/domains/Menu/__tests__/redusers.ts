import { Record } from 'immutable';
import { menu_reducer } from '../reduser';
import { TSetOpenMenuAction } from '../types';

describe('menu reduser:', () => {
  const rInitRMenu = {
    menu_isOpen: false,
  };
  const State = Record(rInitRMenu);
  const defState = new State();

  test('should describe initial state by default', () => {
    const defAction: any = {};
    expect(menu_reducer(undefined, defAction).hashCode()).toBe(
      defState.hashCode(),
    );
  });
  test('should update state value by key menu_isOpen', () => {
    const action: TSetOpenMenuAction = {
      type: 'menu_isOpen',
      payload: true,
    };
    const state = menu_reducer(undefined, action);
    expect(state.get('menu_isOpen')).toBe(true);
  });
});
