import React from 'react';

import classes from './GanttChartTypes.module.css';

const GanttChartTypes = props => {
  const chartSelectedHandler = (event, chartType) => {
    event.preventDefault();
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

export default GanttChartTypes;
