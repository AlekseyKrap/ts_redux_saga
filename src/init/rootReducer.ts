// Core
import { combineReducers } from 'redux';
// Reducers
import { reducer as menu_reducer } from '../domains/Menu/reduser';
import { reducer as monitoring_reducer } from '../domains/Monitoring/Users/reduser';
import { reducer as employees_reducer } from '../domains/Monitoring/Employees/reduser';

export const rootReducer = combineReducers({
  menu_reducer,
  monitoring_reducer,
  employees_reducer,
});

export type AppState = ReturnType<typeof rootReducer>;
