import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  rows: [],
  tasks: [],
  selectedGanttChart: null,
  error: null,
  loading: false
};

const setSelectedGanttChart = (state, action) => {
  return updateObject(state, { selectedGanttChart: action.ganttChartType });
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_GANTT_CHART:
      return setSelectedGanttChart(state, action);
    case actionTypes.FETCH_DATA_START:
      return fetchDataStart(state, action);
    case actionTypes.FETCH_DATA_SUCCESS:
      return fetchDataSuccess(state, action);
    case actionTypes.FETCH_DATA_FAIL:
      return fetchDataFail(state, action);
    default:
      return state;
  }
};

export default reducer;
