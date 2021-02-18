import React from 'react';
import { connect } from 'react-redux';

import classes from './GanttChartTypes.module.css';
import * as actions from '../../store/actions';

const GanttChartTypes = props => {
  const chartSelectedHandler = (event, chartType) => {
    event.preventDefault();
    props.onSetSelectedGanttChart(chartType);
    props.history.push('/gantt-charts/' + chartType);
  };

  return (
    <div className={classes.GanttChartTypes}>
      <button
        className={classes.GanttChartType}
        onClick={event => chartSelectedHandler(event, 'FIELD_ENGINEER')}
      >
        Field Engineers
      </button>
      <button
        className={classes.GanttChartType}
        onClick={event => chartSelectedHandler(event, 'TENNIS_COURT')}
      >
        Tennis Court Bookings
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSetSelectedGanttChart: selectedGanttChart =>
      dispatch(actions.setSelectedGanttChart(selectedGanttChart))
  };
};

export default connect(null, mapDispatchToProps)(GanttChartTypes);
