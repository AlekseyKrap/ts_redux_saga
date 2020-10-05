import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../init/rootReducer';
import { TRMenu } from './reduser';
import { setOpenMenuAction } from './actions';

export type TUseMenu = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};
export function useMenu(): TUseMenu {
  const dispatch = useDispatch();

  const open = useSelector<AppState, TRMenu['menu/isOpen']>(
    ({ menu_reducer }) => menu_reducer.get('menu/isOpen'),
  );

  const handleDrawerOpen = useCallback(() => {
    dispatch(setOpenMenuAction(true));
  }, [dispatch]);

  const handleDrawerClose = useCallback(() => {
    dispatch(setOpenMenuAction(false));
  }, [dispatch]);

  return { open, handleDrawerOpen, handleDrawerClose };
}
