import moment from 'moment';

import * as actionTypes from './actionTypes';
import { BACKEND_URL } from '../../shared/utility';

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

export const setDemoData = (rows, tasks) => {
  return {
    type: actionTypes.SET_DEMO_DATA,
    rows: rows,
    tasks: tasks
  };
};

export const addBarStart = () => {
  return {
    type: actionTypes.ADD_BAR_START
  };
};

export const addBarSuccess = () => {
  return {
    type: actionTypes.ADD_BAR_SUCCESS
  };
};

export const addBarFail = error => {
  return {
    type: actionTypes.ADD_BAR_FAIL,
    error: error
  };
};

export const fetchData = path => {
  return async dispatch => {
    const rows = [];
    const tasks = [];

    if (path !== 'new') {
      dispatch(fetchDataStart());
      try {
        const response = await fetch(`${BACKEND_URL}/getData/${path}`);
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
  };
};

export const taskChange = (taskInfo, path) => {
  return async dispatch => {
    dispatch(taskChangeStart());

    if (path !== 'new') {
      try {
        const response = await fetch(`${BACKEND_URL}/task`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            movedTask: taskInfo.task.model,
            newRow:
              taskInfo.sourceRow.model !== taskInfo.targetRow.model
                ? taskInfo.targetRow.model
                : null
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
    }
  };
};

export const addBar = newBar => {
  return async dispatch => {
    dispatch(addBarStart());
    try {
      const response = await fetch(`${BACKEND_URL}/addBar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newBar: newBar
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Could not add bar!');
      }

      dispatch(addBarSuccess());
    } catch (err) {
      console.log(err.message);
      dispatch(addBarFail(err.message));
    }
  };
};
