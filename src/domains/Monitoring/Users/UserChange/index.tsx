import React, { FC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useUserChange } from './hooks';

export const UserChange: FC = () => {
  const {
 classes, user, handleChange, listUsers, 
} = useUserChange();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">User</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={user}
        onChange={handleChange}
        disabled={listUsers.get('isLoading') || listUsers.get('error').isError}
      >
        {(listUsers.get('data') || []).map((item) => (
          <MenuItem key={item.id} value={item.id.toString(10)}>
            {item.login}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
