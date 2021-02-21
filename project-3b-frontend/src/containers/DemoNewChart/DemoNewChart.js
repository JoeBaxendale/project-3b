import React from 'react';
import { connect } from 'react-redux';
import { Grid, TextareaAutosize, Typography } from '@material-ui/core';

import classes from './DemoNewChart.module.css';
import * as actions from '../../store/actions';

const DemoNewChart = props => {
  return (
    <>
      <Grid container>
        <Grid item xs={6} style={{ padding: '1%' }}>
          <Typography variant="subtitle1">Rows</Typography>
          <TextareaAutosize
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
            aria-label="Enter tasks JSON data"
            rowsMin={15}
            rowsMax={15}
            placeholder="Enter tasks JSON data"
            style={{ width: '100%' }}
          />
        </Grid>
        <button type="button" className={classes.DemoButton}>
          Demo
        </button>
      </Grid>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSetDemoData: (rows, tasks) => dispatch(actions.setDemoData(rows, tasks))
  };
};

export default connect(null, mapDispatchToProps)(DemoNewChart);
