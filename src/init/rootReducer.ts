// Core
import { combineReducers } from 'redux';

// Reducers
import { menu_reducer } from '../domains/Menu/reduser';
import { monitoring_reducer } from '../domains/Monitoring/Users/reduser';
import { employees_reducer } from '../domains/Monitoring/Employees/reduser';

export const rootReducer = combineReducers({
  menu_reducer,
  monitoring_reducer,
  employees_reducer,
});

export type AppState = ReturnType<typeof rootReducer>;
