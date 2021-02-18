import React, { FC } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useUsersTPage } from './hooks';

interface Column {
  id: 'id' | 'usrId' | 'login' | 'date' | 'page';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string | number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'usrId', label: 'User Id', minWidth: 170 },
  { id: 'login', label: 'Login', minWidth: 170 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    format: (value: string | number) => {
      if (typeof value === 'string') return value;
      const date = new Date(value);
      return date.toLocaleDateString();
    },
  },
  {
    id: 'page',
    label: 'Page',
    minWidth: 170,
  },
];

export const UsersTPage: FC = () => {
  const { classes, usersPage } = useUsersTPage();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(usersPage.get('data') || []).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
