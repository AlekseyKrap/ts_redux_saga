import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppState } from '../../../init/rootReducer';
import { TREmployees, actions } from './reduser';
import { getlistEmployees, getEmployeeData } from './actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export type TUseEmployeess = {
  classes: Record<'formControl' | 'selectEmpty', string>;
  changeEmployee: (event: React.ChangeEvent<{ value: unknown }>) => void;
  employee: string;
  employeesList: TREmployees['employees'];
  employessData: TREmployees['Data'];
  role: string;
  changeRole: (event: React.ChangeEvent<{ value: unknown }>) => void;
  roleList: TREmployees['RoleList'];
  region: string;
  changeRegion: (event: React.ChangeEvent<{ value: unknown }>) => void;
  regionsList: TREmployees['RegionsList'];
};
export function useEmployeess(): TUseEmployeess {
  const classes = useStyles();
  const dispatch = useDispatch();
  const employeesList = useSelector<AppState, TREmployees['employees']>(
    ({ employees_reducer }) => employees_reducer.get('employees'),
    shallowEqual,
  );

  const roleList = useSelector<AppState, TREmployees['RoleList']>(
    ({ employees_reducer }) => employees_reducer.get('RoleList'),
    shallowEqual,
  );

  const regionsList = useSelector<AppState, TREmployees['RegionsList']>(
    ({ employees_reducer }) => employees_reducer.get('RegionsList'),
    shallowEqual,
  );
  const employessData = useSelector<AppState, TREmployees['Data']>(
    ({ employees_reducer }) => employees_reducer.get('Data'),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getlistEmployees());
    return () => {
      dispatch(actions.clearAll());
    };
  }, [dispatch]);
  const [employee, setEmployee] = React.useState<string>('');
  const [role, setRole] = React.useState<string>('');
  const [region, setRegion] = React.useState<string>('');

  useEffect(() => {
    const data = employessData.get('data');
    if (data === null) return;
    setRole(data.role.toString());
    setRegion(data.region.toString());
  }, [employessData]);
  const changeEmployee = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const val = event.target.value;
      if (typeof val !== 'string') {
        return;
      }
      setEmployee(val);
      if (val !== '') {
        dispatch(getEmployeeData(val));
      }
    },
    [setEmployee, dispatch],
  );
  const changeRegion = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const val = event.target.value;
      if (typeof val !== 'string') {
        return;
      }
      setRegion(val);
    },
    [setRegion],
  );
  const changeRole = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const val = event.target.value;
      if (typeof val !== 'string') {
        return;
      }
      setRole(val);
    },
    [setRole],
  );

  return {
    classes,
    changeEmployee,
    employee,
    employeesList,
    employessData,
    role,
    changeRole,
    roleList,
    region,
    changeRegion,
    regionsList,
  };
}
