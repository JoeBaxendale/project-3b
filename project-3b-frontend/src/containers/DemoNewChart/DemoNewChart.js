import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, TextareaAutosize, Typography } from '@material-ui/core';
import moment from 'moment';

import classes from './DemoNewChart.module.css';
import * as actions from '../../store/actions';

export const DemoNewChart = props => {
  const [rowsInput, setRowsInput] = useState(null);
  const [tasksInput, setTasksInput] = useState(null);

  const demoChartHandler = event => {
    event.preventDefault();
    const rows = JSON.parse(rowsInput);
    const tasks = JSON.parse(tasksInput, (key, value) => {
      if (key === 'from' || key === 'to') {
        return moment(value);
      }
      return value;
    });
    props.onSetDemoData(rows, tasks);
    props.history.push('/gantt-charts/new');
  };

  const checkJsonStructure = () => {
    if (typeof rowsInput !== 'string' || typeof tasksInput !== 'string') return false;
    try {
      const rowsResult = JSON.parse(rowsInput);
      const tasksResult = JSON.parse(tasksInput);
      const rowsType = Object.prototype.toString.call(rowsResult);
      const tasksType = Object.prototype.toString.call(tasksResult);
      return (
        rowsType === '[object Object]' ||
        rowsType === '[object Array]' ||
        tasksType === '[object Object]' ||
        tasksType === '[object Array]'
      );
    } catch (err) {
      return false;
    }
  };

  return (
    <form onSubmit={demoChartHandler}>
      <Grid container>
        <Grid item xs={6} style={{ padding: '1%' }}>
          <Typography variant="subtitle1">Rows</Typography>
          <TextareaAutosize
            onChange={event => setRowsInput(event.target.value)}
            aria-label="Enter rows JSON data"
            rowsMin={15}
            rowsMax={15}
            placeholder="Enter rows JSON data"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6} style={{ padding: '1%' }}>
          <Typography variant="subtitle1">Tasks</Typography>
          <TextareaAutosize
            onChange={event => setTasksInput(event.target.value)}
            aria-label="Enter tasks JSON data"
            rowsMin={15}
            rowsMax={15}
            placeholder="Enter tasks JSON data"
            style={{ width: '100%' }}
          />
        </Grid>
        <button className={classes.DemoButton} disabled={!checkJsonStructure()}>
          Demo
        </button>
      </Grid>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSetDemoData: (rows, tasks) => dispatch(actions.setDemoData(rows, tasks))
  };
};

export default connect(null, mapDispatchToProps)(DemoNewChart);
