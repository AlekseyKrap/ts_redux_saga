import { Record } from 'immutable';
import { TAPIUsersPage } from '../../../../api';
import { RUserItem, TRMonitoring, reducer, actions } from '../reduser';
import { genFetchedData } from '../../../../core/fetchedData';
import { TRActionsR } from '../../../../types';

describe('Monitoring -> Users -> reduser:', () => {
  const rInitMonitoring: TRMonitoring = {
    listUsers: genFetchedData<Array<RUserItem>>([]),
    usersPage: genFetchedData<TAPIUsersPage>([]),
  };
  const State = Record(rInitMonitoring);
  const defState = new State();
  const defAction = {} as TRActionsR<TRMonitoring>;
  test('should describe initial state by default', () => {
    expect(JSON.stringify(reducer(undefined, defAction))).toBe(
      JSON.stringify(defState)
    );
  });
  test('should update state value by key monit/listUsers', () => {
    const payload = genFetchedData<Array<RUserItem>>([
      { id: 1, login: '@JoeyTribbiani' },
    ]);
    const action = actions.set('listUsers', payload);
    const state = reducer(undefined, action);
    expect(state.get('listUsers')).toEqual(payload);
  });
  test('should update state value by key monit/UsersPage', () => {
    const payload = genFetchedData<TAPIUsersPage>([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
    ]);
    const action = actions.set('usersPage', payload);
    const state = reducer(undefined, action);
    expect(state.get('usersPage')).toEqual(payload);
  });
  test('should update state value by key monit/clear', () => {
    const payloadUsersPage = genFetchedData<TAPIUsersPage>([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
    ]);
    const actionUsersPage = actions.set('usersPage', payloadUsersPage);
    const stateStep1 = reducer(undefined, actionUsersPage);
    expect(stateStep1.get('usersPage')).toEqual(payloadUsersPage);

    const actionClear = actions.clear('usersPage');
    const stateStep2 = reducer(stateStep1, actionClear);
    expect(stateStep2.get('usersPage').get('data')).toEqual([]);
  });
  test('should update state value by key monit/clearAll', () => {
    const payloadUsersPage = genFetchedData<TAPIUsersPage>([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
    ]);
    const actionUsersPage = actions.set('usersPage', payloadUsersPage);
    const stateStep1 = reducer(undefined, actionUsersPage);
    expect(stateStep1.get('usersPage')).toEqual(payloadUsersPage);

    const payloadlistUsers = genFetchedData<Array<RUserItem>>([
      { id: 1, login: '@JoeyTribbiani' },
    ]);
    const action = actions.set('listUsers', payloadlistUsers);
    const stateStep2 = reducer(stateStep1, action);
    expect(stateStep2.get('listUsers')).toEqual(payloadlistUsers);

    const actionClearAll = actions.clearAll();
    const stateStep3 = reducer(stateStep2, actionClearAll);
    expect(stateStep3.get('usersPage').get('data')).toEqual([]);
    expect(stateStep3.get('listUsers').get('data')).toEqual([]);
  });
});
