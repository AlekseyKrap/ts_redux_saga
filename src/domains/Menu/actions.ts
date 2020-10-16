import { TSetOpenMenuAction } from './types';

export function setOpenMenuAction(
  isOpen: TSetOpenMenuAction['payload'],
): TSetOpenMenuAction {
  return {
    type: 'isOpen',
    payload: isOpen,
  };
}
