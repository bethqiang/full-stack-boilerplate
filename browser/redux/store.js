import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import authReducer from './reducers/auth-reducer';

const rootReducer = combineReducers({
  auth: authReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);
