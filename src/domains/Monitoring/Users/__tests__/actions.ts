import {
  filLlistUsers,
  getlistUsers,
  getUsersPage,
  setUsersPage,
} from '../actions';
import { genReceivedData } from '../../../../workers/makeReqWithRD';
import { RUserItem } from '../reduser';
import { TAPIUsersPage } from '../../../../api';

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

  test('filLlistUsers', () => {
    const listUsers = genReceivedData<Array<RUserItem>>([
      {
        id: 1,
        login: 'User#1',
      },
      {
        id: 2,
        login: 'User#2',
      },
      {
        id: 3,
        login: 'User#3',
      },
    ]);
    expect(filLlistUsers(listUsers)).toEqual({
      type: 'monit/listUsers',
      payload: listUsers,
    });
  });

  test('setUsersPage', () => {
    const usersPage = genReceivedData<TAPIUsersPage>([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
      {
        id: 2,
        usrId: 1,
        login: 'User#1',
        date: 1491625172450,
        page: 'page2',
      },
      {
        id: 3,
        usrId: 1,
        login: 'User#1',
        date: 1591525172450,
        page: 'page1',
      },
    ]);
    expect(setUsersPage(usersPage)).toEqual({
      type: 'monit/UsersPage',
      payload: usersPage,
    });
  });
});
