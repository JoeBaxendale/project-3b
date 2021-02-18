import moment from 'moment';

import * as actionTypes from './actionTypes';

export const setSelectedGanttChart = ganttChartType => {
  return {
    type: actionTypes.SET_SELECTED_GANTT_CHART,
    ganttChartType: ganttChartType
  };
};

export const fetchDataStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START
  };
};

export const fetchDataSuccess = (rows, tasks) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    rows: rows,
    tasks: tasks
  };
};

export const fetchDataFail = error => {
  return {
    type: actionTypes.FETCH_DATA_FAIL,
    error: error
  };
};

export const taskChangeStart = () => {
  return {
    type: actionTypes.TASK_CHANGE_START
  };
};

export const taskChangeSuccess = () => {
  return {
    type: actionTypes.TASK_CHANGE_SUCCESS
  };
};

export const taskChangeFail = error => {
  return {
    type: actionTypes.TASK_CHANGE_FAIL,
    error: error
  };
};

export const fetchData = path => {
  return async dispatch => {
    dispatch(fetchDataStart());

    const rows = [];
    const tasks = [];

    if (path) {
      try {
        const response = await fetch(`http://localhost:8080/getData/${path}`);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Failed to fetch data.');
        }

        for (let key in resData.rows) {
          rows.push({
            ...resData.rows[key]
          });
        }

        for (let key in resData.tasks) {
          tasks.push({
            ...resData.tasks[key],
            from: moment(resData.tasks[key].from),
            to: moment(resData.tasks[key].to)
          });
        }
        dispatch(fetchDataSuccess(rows, tasks));
      } catch (err) {
        console.log(err.message);
        dispatch(fetchDataFail(err.message));
      }
    }

    // s
  };
};

export const taskChange = (taskInfo, selectedGanttChart) => {
  return async dispatch => {
    dispatch(taskChangeStart());

    try {
      const response = await fetch('http://localhost:8080/task', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movedTask: taskInfo.task.model,
          newRow:
            taskInfo.sourceRow.model !== taskInfo.targetRow.model ? taskInfo.targetRow.model : null
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Could not update row!');
      }

      dispatch(taskChangeSuccess());
    } catch (err) {
      console.log(err.message);
      dispatch(taskChangeFail(err.message));
    }
  };
};
