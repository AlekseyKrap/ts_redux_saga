import {
  employeeData,
  employeesClearALL,
  employeeslist,
  getEmployeeData,
  getlistEmployees,
} from '../actions';
import { genReceivedData } from '../../../../workers/makeReqWithRD';
import { TAPIEmployeeData, TAPIlistEmployees } from '../../../../api';

describe('Monitoring -> Employees -> action:', () => {
  test('getlistEmployees', () => {
    expect(getlistEmployees()).toEqual({
      type: 'employees/getList',
    });
  });
  test('employeesClearALL', () => {
    expect(employeesClearALL()).toEqual({
      type: 'employees/clearAll',
    });
  });

  test('employeeslist', () => {
    const employees = genReceivedData<TAPIlistEmployees>([]);
    expect(employeeslist(employees)).toEqual({
      type: 'employees',
      payload: employees,
    });
  });
  test('employeeData', () => {
    const data = genReceivedData<TAPIEmployeeData>({
      id: 1,
      role: 2,
      region: 1,
    });
    expect(employeeData(data)).toEqual({
      type: 'employess/Data',
      payload: data,
    });
  });
  test('getEmployeeData', () => {
    expect(getEmployeeData('1')).toEqual({
      type: 'employees/getData',
      payload: '1',
    });
  });
});
