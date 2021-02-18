import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { SvelteGantt, SvelteGanttTable } from 'svelte-gantt';
import moment from 'moment';

import 'svelte-gantt/css/svelteGantt.css';
import './SvelteGanttReact.css';
import * as actions from '../../store/actions';

const SvelteGanttReact = props => {
  const divRef = useRef(null);
  const svelteGanttRef = useRef(null);

  const currentStart = moment('00:00', 'HH:mm');
  const currentEnd = moment('23:59', 'HH:mm');

  const { onFetchData, onTaskChange } = props;

  let title = null;
  if (window.location.href.includes('FIELD_ENGINEER')) {
    title = 'Field Engineers';
  } else if (window.location.href.includes('TENNIS_COURT')) {
    title = 'Tennis Court';
  }

  useEffect(() => {
    onFetchData(props.selectedGanttChart);
  }, [onFetchData, props.selectedGanttChart]);

  useEffect(() => {
    // Cannot do anything without the div.
    if (!divRef.current) return;

    const options = {
      rows: props.rows,
      tasks: props.tasks,
      headers: [
        { unit: 'day', format: 'dddd D MMMM', sticky: true },
        { unit: 'hour', format: 'HH:mm', sticky: true }
      ],
      fitWidth: true,
      from: currentStart,
      to: currentEnd,
      minWidth: 2050,

      tableHeaders: [{ title: title, property: 'label', width: 140, type: 'tree' }],
      tableWidth: 240,
      ganttTableModules: [SvelteGanttTable],
      taskContent: task => `${task.label} ${task.from.format('HH:mm')}`
    };

    if (!svelteGanttRef.current) {
      // Mount new element.
      svelteGanttRef.current = new SvelteGantt({
        target: divRef.current,
        props: options
      });
    } else {
      // Update current element.
      svelteGanttRef.current.$set(options);
    }
  }, [props.rows, props.tasks, currentStart, currentEnd, title]);

  useEffect(() => {
    // The Gantt chart needs to be mounted.
    if (!svelteGanttRef.current) return;

    svelteGanttRef.current.api.tasks.on.changed(task => {
      onTaskChange(task[0], props.selectedGanttChart);
    });
  }, [onTaskChange, props.selectedGanttChart]);

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error}</p>;
  }

  const onSetPreviousDay = () => {
    currentStart.subtract(1, 'day');
    currentEnd.subtract(1, 'day');
    svelteGanttRef.current.$set({
      from: currentStart,
      to: currentEnd
    });
  };

  const onSetDayView = () => {
    svelteGanttRef.current.$set({
      fitWidth: true,
      columnUnit: 'minute',
      columnOffset: 15,
      from: currentStart,
      to: currentEnd,
      minWidth: 2050,
      headers: [
        { unit: 'day', format: 'dddd D MMMM', sticky: true },
        { unit: 'hour', format: 'HH:mm', sticky: true }
      ]
    });
  };

  const onSetNextDay = () => {
    currentStart.add(1, 'day');
    currentEnd.add(1, 'day');
    svelteGanttRef.current.$set({
      from: currentStart,
      to: currentEnd
    });
  };

  const onSetWeekView = () => {
    svelteGanttRef.current.$set({
      fitWidth: false,
      columnUnit: 'hour',
      columnOffset: 1,
      from: currentStart.clone().startOf('week'),
      to: currentStart.clone().endOf('week'),
      minWidth: 5000,
      headers: [
        { unit: 'month', format: 'MMMM YYYY', sticky: true },
        { unit: 'day', format: 'ddd DD', sticky: true }
      ]
    });
  };

  return (
    <>
      {errorMessage || (
        <>
          <div className="gantt-controls">
            <button type="button" className="gantt-control-button" onClick={onSetPreviousDay}>
              &lt;
            </button>
            <button type="button" className="gantt-control-button" onClick={onSetDayView}>
              Day View
            </button>
            <button type="button" className="gantt-control-button" onClick={onSetNextDay}>
              &gt;
            </button>
            <button type="button" className="gantt-control-button" onClick={onSetWeekView}>
              Week View
            </button>
            <button type="button" className="gantt-control-button" id="new-task">
              Add New Bar
            </button>
          </div>
          <div className="gantt-chart" ref={divRef} />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    rows: state.gantt.rows,
    tasks: state.gantt.tasks,
    selectedGanttChart: state.gantt.selectedGanttChart,
    error: state.gantt.error,
    loading: state.gantt.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchData: selectedGanttChart => dispatch(actions.fetchData(selectedGanttChart)),
    onTaskChange: (task, selectedGanttChart) =>
      dispatch(actions.taskChange(task, selectedGanttChart))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SvelteGanttReact);
