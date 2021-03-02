import { getEmployeeData, getlistEmployees } from '../actions';

describe('Monitoring -> Employees -> action:', () => {
  test('getlistEmployees', () => {
    expect(getlistEmployees()).toEqual({
      type: 'employees/getList',
    });
  });

  test('getEmployeeData', () => {
    expect(getEmployeeData('1')).toEqual({
      type: 'employees/getData',
      payload: '1',
    });
  });
});
