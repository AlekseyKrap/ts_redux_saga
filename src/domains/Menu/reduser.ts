import initReduser from '../../init/initReduser';

export type TRMenu = {
  isOpen: boolean;
};
export const rInitMenu: TRMenu = {
  isOpen: false,
};

export const { reduser, actions } = initReduser(rInitMenu, 'menu');
export const menu_reducer = reduser;
