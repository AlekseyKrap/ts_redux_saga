import { getlistUsers, getUsersPage } from '../actions';

describe('Monitoring -> Users -> action:', () => {
  test('getlistUsers', () => {
    expect(getlistUsers()).toEqual({
      type: 'monit/getListUsers',
    });
  });
  test('getUsersPage', () => {
    expect(getUsersPage('1')).toEqual({
      type: 'monit/getUsersPage',
      payload: '1',
    });
  });
});
