import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, TextareaAutosize, Typography } from '@material-ui/core';

import classes from './DemoNewChart.module.css';
import * as actions from '../../store/actions';

const DemoNewChart = props => {
  const [rowsInput, setRowsInput] = useState(null);
  const [tasksInput, setTasksInput] = useState(null);

  const demoChartHandler = event => {
    event.preventDefault();
    const rows = JSON.parse(rowsInput);
    const tasks = JSON.parse(tasksInput);
    props.onSetDemoData(rows, tasks);
    props.history.push('/gantt-charts/new');
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
        <button className={classes.DemoButton}>Demo</button>
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
