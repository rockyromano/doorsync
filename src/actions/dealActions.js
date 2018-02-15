import * as types from './actionTypes';
import dealsApi from '../api/dealsApi';

export function loadAllDealsSuccess(deals) {
  return {
    type: types.LOAD_ALL_DEALS_SUCCESS,
    deals,
  };
}

export function loadAllDeals() {
  // Thunk ALWAYS expects a function that receives a dispatch
  return function(dispatch) {
    return dealsApi
      .getAllDeals()
      .then(deals => {
        dispatch(loadAllDealsSuccess(deals));
      })
      .catch(error => {
        throw error;
      });
  };
}
