import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import type { AppState } from '../../../../init/rootReducer';
import type { TRMonitoring } from '../reduser';
import { getlistUsers, getUsersPage } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export type TUseUserChange = {
  classes: Record<'formControl' | 'selectEmpty', string>;
  user: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  listUsers: TRMonitoring['listUsers'];
};
export function useUserChange(): TUseUserChange {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listUsers = useSelector<AppState, TRMonitoring['listUsers']>(
    ({ monitoring_reducer }) => monitoring_reducer.get('listUsers'),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getlistUsers());
  }, [dispatch]);

  const [user, setUser] = React.useState<string>('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const val = event.target.value;
      if (typeof val !== 'string') {
        return;
      }
      setUser(val);
      if (val !== '') {
        dispatch(getUsersPage(val));
      }
    },
    [setUser, dispatch]
  );

  return {
    classes,
    user,
    handleChange,
    listUsers,
  };
}
