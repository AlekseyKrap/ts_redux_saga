import initReducer from '../../init/initReducer';

export type TRMenu = {
  isOpen: boolean;
};
export const rInitMenu: TRMenu = {
  isOpen: false,
};

export const { reducer, actions } = initReducer(rInitMenu, 'menu');
