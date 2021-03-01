import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { SvelteGantt, SvelteGanttTable } from 'svelte-gantt';
import moment from 'moment';

import SvelteGanttAddBar from '../SvelteGanttAddBar/SvelteGanttAddBar';
import Spinner from '../../components/UI/Spinner/Spinner';
import 'svelte-gantt/css/svelteGantt.css';
import './SvelteGanttReact.css';
import * as actions from '../../store/actions';

const SvelteGanttReact = props => {
  const divRef = useRef(null);
  const svelteGanttRef = useRef(null);

  const currentStart = moment('00:00', 'HH:mm');
  const currentEnd = moment('23:59', 'HH:mm');

  const { onFetchData, onTaskChange } = props;

  const lastPartOfUrl = props.location.pathname.split('/').pop();

  const [jsonFile, setJsonFile] = useState([]);

  let title = null;
  if (lastPartOfUrl === 'FIELD_ENGINEER') {
    title = 'Field Engineers';
  } else if (lastPartOfUrl === 'TENNIS_COURT') {
    title = 'Tennis Court';
  }

  useEffect(() => {
    onFetchData(lastPartOfUrl);
  }, [onFetchData, lastPartOfUrl]);

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
      onTaskChange(task[0], lastPartOfUrl);
    });
  }, [onTaskChange, lastPartOfUrl]);

  useEffect(() => {
    const json = [];
    json.push('rows: ');
    for (let key in props.rows) {
      json.push([props.rows[key].id, ' ' + props.rows[key].label]);
    }
    json.push('tasks:');
    for (let key in props.tasks) {
      json.push([
        props.tasks[key].id,
        props.tasks[key].resourceId,
        props.tasks[key].label,
        props.tasks[key].from,
        props.tasks[key].to
      ]);
    }
    let newJson = [];
    for (let i = 0; i < json.length; i++) {
      let newEntry = json[i] + '\n';
      newJson.push(newEntry);
    }
    setJsonFile(newJson);
  }, [props.rows, props.tasks]);

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

  const toggleJson = () => {
    let element = document.getElementsByClassName('json-display')[0];
    element.style.visibility === 'visible'
      ? (element.style.visibility = 'hidden')
      : (element.style.visibility = 'visible');
  };

  const applyJsonChanges = () => {
    let newJson = document.getElementsByClassName('json-display')[0].innerHTML;
    newJson = newJson.split('\n');
    let newRows = [];
    let newTasks = [];
    for (let i = 1; i < newJson.indexOf('tasks:'); i++) {
      let newRow = {};
      newRow.id = newJson[i].split(',')[0];
      newRow.label = newJson[i].split(',')[1];
      newRows.push(newRow);
    }
    for (let i = newJson.lastIndexOf('tasks:') + 1; i < newJson.length - 1; i++) {
      let newTask = {};
      let task = newJson[i].split(',');
      newTask.id = task[0];
      newTask.resourceId = task[1];
      newTask.label = task[2];
      newTask.from = moment(task[3], 'HH:mm');
      newTask.to = moment(task[4], 'HH:mm');
      if (newTask.label === 'Absence' || newTask.label === 'Not Available') {
        newTask.classes = 'orange';
      }
      if (newTask.label === 'Scheduled Shift' || newTask.label === 'Available To Book') {
        newTask.classes = 'green';
      }
      if (newTask.label === 'Overtime' || newTask.label === 'Tournament') {
        newTask.classes = 'blue';
      }
      newTasks.push(newTask);
    }
    props.onSetDemoData(newRows, newTasks);
  };

  return (
    <>
      {props.loading && <Spinner />}
      {props.error ? (
        <p>{props.error}</p>
      ) : (
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
            {svelteGanttRef.current && (
              <>
                <SvelteGanttAddBar gantt={svelteGanttRef.current} colour="orange" />
                <SvelteGanttAddBar gantt={svelteGanttRef.current} colour="green" />
                <SvelteGanttAddBar gantt={svelteGanttRef.current} colour="blue" />
              </>
            )}
          </div>
          <div className="gantt-chart" ref={divRef} />
          <button type="button" className="gantt-control-button" onClick={toggleJson}>
            Edit JSON
          </button>
          <pre
            className="json-display"
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {jsonFile}
          </pre>
          <button type="button" className="gantt-control-button" onClick={applyJsonChanges}>
            View Changes
          </button>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    rows: state.gantt.rows,
    tasks: state.gantt.tasks,
    error: state.gantt.error,
    loading: state.gantt.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchData: path => dispatch(actions.fetchData(path)),
    onTaskChange: (taskInfo, path) => dispatch(actions.taskChange(taskInfo, path)),
    onSetDemoData: (rows, tasks) => dispatch(actions.setDemoData(rows, tasks))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SvelteGanttReact);
