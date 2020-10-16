import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Record } from 'immutable';
import { AppState } from '../../init/rootReducer';
import { TRMenu, actions } from './reduser';
import { setOpenMenuAction } from './actions';

export type TUseMenu = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};
export function useMenu(): TUseMenu {
  const dispatch = useDispatch();

  const open = useSelector<AppState, TRMenu['isOpen']>(({ menu_reducer }) => menu_reducer.get('isOpen'));

  const handleDrawerOpen = useCallback(() => {
    dispatch(actions.isOpen(true));
  }, [dispatch]);

  const handleDrawerClose = useCallback(() => {
    dispatch(actions.isOpen(false));
  }, [dispatch]);

  return { open, handleDrawerOpen, handleDrawerClose };
}
