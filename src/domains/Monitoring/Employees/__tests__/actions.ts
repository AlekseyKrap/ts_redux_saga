import {
  employeeData,
  employeesClearALL,
  employeesDataEr,
  employeeslist,
  fetchEmployeeData,
  fetchingEmployeesList,
  getlistEmployees,
  setErrorEmployees,
} from '../actions';

describe('Monitoring -> Employees -> action:', () => {
  test('getlistEmployees', () => {
    expect(getlistEmployees()).toEqual({
      type: 'EMPLOYEES_GET_LIST',
    });
  });
  test('employeesClearALL', () => {
    expect(employeesClearALL()).toEqual({
      type: 'EMPLOYEES_CLEAR_ALL',
    });
  });
  test('employees_IsLoading', () => {
    expect(fetchingEmployeesList(true)).toEqual({
      type: 'employees_IsLoading',
      payload: true,
    });
  });
  test('employeeslist', () => {
    expect(employeeslist([])).toEqual({
      type: 'employees',
      payload: [],
    });
  });
  test('setErrorEmployees', () => {
    expect(setErrorEmployees(true, 'Error')).toEqual({
      type: 'employees_Er',
      payload: {
        error: true,
        message: 'Error',
      },
    });
  });
  test('fetchEmployeeData', () => {
    expect(fetchEmployeeData(true)).toEqual({
      type: 'employess_Data_IsLoading',
      payload: true,
    });
  });
  test('employeeData', () => {
    const data = { id: 1, role: 2, region: 1 };
    expect(employeeData(data)).toEqual({
      type: 'employess_Data',
      payload: data,
    });
  });
  test('employeesDataEr', () => {
    expect(employeesDataEr(true, 'Error')).toEqual({
      type: 'employess_Data_Er',
      payload: {
        error: true,
        message: 'Error',
      },
    });
  });
});
