import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dealsReducer(state = initialState.deals, action) {
  switch (action.type) {
    case types.LOAD_ALL_DEALS_SUCCESS:
      return (action.deals) ? action.deals.deals : [];
    case types.LOAD_ALL_DEALS_ERROR:
      return action.err;
    default:
      return state;
  }
}
