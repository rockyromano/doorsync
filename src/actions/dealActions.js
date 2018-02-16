import * as types from './actionTypes';
import dealsApi from '../api/dealsApi';

export function loadAllDealsSuccess(deals) {
  return {
    type: types.LOAD_ALL_DEALS_SUCCESS,
    deals,
  };
}

export function loadAllDealsError(err) {
  return {
    type: types.LOAD_ALL_DEALS_SUCCESS,
    err,
  };
}

export function loadAllDeals() {
  // Thunk ALWAYS expects a function that receives a dispatch
  return function(dispatch) {
    return dealsApi
      .getAllDeals()
      .then(deals => {
        debugger;
        dispatch(loadAllDealsSuccess(deals));
      }).catch((err) => {
        debugger;
        dispatch(loadAllDealsError(err));
      });
  };
}
