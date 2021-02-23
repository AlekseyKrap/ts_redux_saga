import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import type { AppState } from '../../../../init/rootReducer';
import type { TRMonitoring } from '../reduser';
import { getUsersPage } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export type TUseUsersTPage = {
  classes: Record<'root' | 'container' | 'formControl' | 'selectEmpty', string>;
  usersPage: TRMonitoring['usersPage'];
};
export function useUsersTPage(): TUseUsersTPage {
  const dispatch = useDispatch();
  const classes = useStyles();

  const usersPage = useSelector<AppState, TRMonitoring['usersPage']>(
    ({ monitoring_reducer }) => monitoring_reducer.get('usersPage'),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getUsersPage());
  }, [dispatch]);

  return { classes, usersPage };
}
