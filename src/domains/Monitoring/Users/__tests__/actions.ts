import {
  fetchUsersList,
  filLlistUsers,
  getlistUsers,
  getUsersPage,
  setErrorListUsers,
  setErrorUsersPage,
  setUsersPage,
  usersPageIsLoading,
} from '../actions';

describe('Monitoring -> Users -> action:', () => {
  test('getlistUsers', () => {
    expect(getlistUsers()).toEqual({
      type: 'MONIT_GET_LIST_USERS',
    });
  });
  test('getUsersPage', () => {
    expect(getUsersPage('1')).toEqual({
      type: 'MONIT_GET_USERS_PAGE',
      payload: '1',
    });
  });
  test('fetchUsersList', () => {
    expect(fetchUsersList(true)).toEqual({
      type: 'monit_usersIsLoading',
      payload: true,
    });
  });
  test('filLlistUsers', () => {
    const listUsers = [
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
    ];
    expect(filLlistUsers(listUsers)).toEqual({
      type: 'monit_listUsers',
      payload: listUsers,
    });
  });
  test('setErrorListUsers', () => {
    expect(setErrorListUsers(true, 'Error')).toEqual({
      type: 'monit_listUsers_Er',
      payload: {
        error: true,
        message: 'Error',
      },
    });
  });
  test('usersPageIsLoading', () => {
    expect(usersPageIsLoading(true)).toEqual({
      type: 'monit_UsersPageIsLoading',
      payload: true,
    });
  });
  test('setUsersPage', () => {
    const usersPage = [
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
    ];
    expect(setUsersPage(usersPage)).toEqual({
      type: 'monit_UsersPage',
      payload: usersPage,
    });
  });
  test('setErrorUsersPage', () => {
    expect(setErrorUsersPage(true, 'Error')).toEqual({
      type: 'monit_UsersPage_Er',
      payload: {
        error: true,
        message: 'Error',
      },
    });
  });
});
