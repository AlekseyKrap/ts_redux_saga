import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppState } from '../../../../init/rootReducer';
import { TR_Monitoring } from '../reduser';
import { getUsersPage } from '../actions';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  }));

type TUseUsersTPage = {
  classes: Record<'root' | 'container' | 'formControl' | 'selectEmpty', string>;
  usersPage: TR_Monitoring['monit_UsersPage'];
};
export function useUsersTPage(): TUseUsersTPage {
  const dispatch = useDispatch();
  const classes = useStyles();

  const usersPage = useSelector<AppState, TR_Monitoring['monit_UsersPage']>(
    ({ monitoring_reducer }) => monitoring_reducer.get('monit_UsersPage'),
  );

  useEffect(() => {
    dispatch(getUsersPage());
  }, [dispatch]);

  return { classes, usersPage };
}
