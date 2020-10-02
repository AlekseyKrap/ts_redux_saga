import React, { FC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useEmployeess } from './hooks';

export const Employees: FC = () => {
  const {
    classes,
    changeEmployee,
    employee,
    employeesList,
    role,
    changeRole,
    roleList,
    region,
    changeRegion,
    regionsList,
    employessData,
  } = useEmployeess();

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="employees-select-label">Employees</InputLabel>
        <Select
          labelId="employees-select-label"
          id="employees-select"
          disabled={
            employeesList.get('isLoading')
            || employeesList.get('error').isError
            || employeesList.get('LTU') === 0
          }
          onChange={changeEmployee}
          value={employee}
        >
          {(employeesList.get('data') || []).map((item) => (
            <MenuItem key={item.id} value={item.id.toString(10)}>
              {item.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {employessData.get('data') !== null && !employessData.get('isLoading') && (
        <Grid container>
          <FormControl className={classes.formControl}>
            <InputLabel id="employees-role-select-label">Roles</InputLabel>
            <Select
              labelId="employees-role-select-label"
              id="employees-roles"
              value={role}
              onChange={changeRole}
            >
              {roleList.map((item) => (
                <MenuItem key={item.id} value={item.id.toString(10)}>
                  {item.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="employees-regions-select-label">Regions</InputLabel>
            <Select
              labelId="employees-regions-select-label"
              id="employees-regions"
              value={region}
              onChange={changeRegion}
            >
              {regionsList.map((item) => (
                <MenuItem key={item.id} value={item.id.toString(10)}>
                  {item.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </>
  );
};
