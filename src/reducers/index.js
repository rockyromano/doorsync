import { combineReducers } from 'redux';
import user from './userReducer';
import runtime from './runtimeReducer';
import deals from './dealsReducer';

export default combineReducers({
  user,
  runtime,
  deals,
});
