import moment from 'moment';

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  rows: [],
  tasks: [],
  error: null,
  loading: false
};

const fetchDataStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchDataSuccess = (state, action) => {
  return updateObject(state, {
    rows: action.rows,
    tasks: action.tasks,
    error: null,
    loading: false
  });
};

const fetchDataFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const setDemoData = (state, action) => {
  return updateObject(state, {
    rows: action.rows,
    tasks: action.tasks.map(task =>
      updateObject(task, { from: moment(task.from), to: moment(task.to) })
    )
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START:
      return fetchDataStart(state, action);
    case actionTypes.FETCH_DATA_SUCCESS:
      return fetchDataSuccess(state, action);
    case actionTypes.FETCH_DATA_FAIL:
      return fetchDataFail(state, action);
    case actionTypes.SET_DEMO_DATA:
      return setDemoData(state, action);
    default:
      return state;
  }
};

export default reducer;
