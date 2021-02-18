import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../init/rootReducer';
import { TRMenu, actions } from './reduser';

export type TUseMenu = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};
export function useMenu(): TUseMenu {
  const dispatch = useDispatch();

  const open = useSelector<AppState, TRMenu['isOpen']>(
    ({ menu_reducer }) => menu_reducer.get('isOpen'),
    shallowEqual
  );

  const handleDrawerOpen = useCallback(() => {
    dispatch(actions.set('isOpen', true));
  }, [dispatch]);

  const handleDrawerClose = useCallback(() => {
    dispatch(actions.set('isOpen', false));
  }, [dispatch]);

  return { open, handleDrawerOpen, handleDrawerClose };
}
