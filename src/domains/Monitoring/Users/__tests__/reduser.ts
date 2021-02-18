import { Record } from 'immutable';
import { genReceivedData } from '../../../../workers/makeReqWithRD';
import { TAPIUsersPage } from '../../../../api';
import {
  monitoring_reducer,
  RUserItem,
  TActionsR_Monit,
  TAMonitClear,
  TAMonitClearALL,
  TRMonitoring,
} from '../reduser';
import { TActionlistUsers, TMonit_UsersPage } from '../types';

describe('Monitoring -> Users -> reduser:', () => {
  const rInitMonitoring: TRMonitoring = {
    'monit/listUsers': genReceivedData<Array<RUserItem>>([]),
    'monit/UsersPage': genReceivedData<TAPIUsersPage>([]),
  };
  const State = Record(rInitMonitoring);
  const defState = new State();
  const defAction = {} as TActionsR_Monit;
  test('should describe initial state by default', () => {
    expect(JSON.stringify(monitoring_reducer(undefined, defAction))).toBe(
      JSON.stringify(defState)
    );
  });
  test('should update state value by key monit/listUsers', () => {
    const payload = genReceivedData<Array<RUserItem>>([
      { id: 1, login: '@JoeyTribbiani' },
    ]);
    const action: TActionlistUsers = {
      type: 'monit/listUsers',
      payload,
    };
    const state = monitoring_reducer(undefined, action);
    expect(state.get('monit/listUsers')).toEqual(payload);
  });
  test('should update state value by key monit/UsersPage', () => {
    const payload = genReceivedData<TAPIUsersPage>([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
    ]);
    const action: TMonit_UsersPage = {
      type: 'monit/UsersPage',
      payload,
    };
    const state = monitoring_reducer(undefined, action);
    expect(state.get('monit/UsersPage')).toEqual(payload);
  });
  test('should update state value by key monit/clear', () => {
    const payloadUsersPage = genReceivedData<TAPIUsersPage>([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
    ]);
    const actionUsersPage: TMonit_UsersPage = {
      type: 'monit/UsersPage',
      payload: payloadUsersPage,
    };
    const stateStep1 = monitoring_reducer(undefined, actionUsersPage);
    expect(stateStep1.get('monit/UsersPage')).toEqual(payloadUsersPage);

    const actionClear: TAMonitClear = {
      type: 'monit/clear',
      payload: 'monit/UsersPage',
    };
    const stateStep2 = monitoring_reducer(stateStep1, actionClear);
    expect(stateStep2.get('monit/UsersPage').get('data')).toEqual([]);
  });
  test('should update state value by key monit/clearAll', () => {
    const payloadUsersPage = genReceivedData<TAPIUsersPage>([
      {
        id: 1,
        usrId: 1,
        login: 'User#1',
        date: 1591625172450,
        page: 'page1',
      },
    ]);
    const actionUsersPage: TMonit_UsersPage = {
      type: 'monit/UsersPage',
      payload: payloadUsersPage,
    };
    const stateStep1 = monitoring_reducer(undefined, actionUsersPage);
    expect(stateStep1.get('monit/UsersPage')).toEqual(payloadUsersPage);

    const payloadlistUsers = genReceivedData<Array<RUserItem>>([
      { id: 1, login: '@JoeyTribbiani' },
    ]);
    const action: TActionlistUsers = {
      type: 'monit/listUsers',
      payload: payloadlistUsers,
    };
    const stateStep2 = monitoring_reducer(stateStep1, action);
    expect(stateStep2.get('monit/listUsers')).toEqual(payloadlistUsers);

    const actionClearAll: TAMonitClearALL = {
      type: 'monit/clearAll',
    };
    const stateStep3 = monitoring_reducer(stateStep2, actionClearAll);
    expect(stateStep3.get('monit/UsersPage').get('data')).toEqual([]);
    expect(stateStep3.get('monit/listUsers').get('data')).toEqual([]);
  });
});
