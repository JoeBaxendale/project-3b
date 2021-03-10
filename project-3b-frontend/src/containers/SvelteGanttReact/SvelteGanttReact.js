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

  const [toggleJson, setToggleJson] = useState(false);
  const [jsonFile, setJsonFile] = useState([]);
  const [labels, setLabels] = useState([]);

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
      console.log('Changed task:');
      console.log(task[0].task.model);
    });
  }, [onTaskChange, lastPartOfUrl]);

  useEffect(() => {
    const json = [];
    json.push('rows: ');
    for (let key in props.rows) {
      json.push([props.rows[key].id, ' ' + props.rows[key].label]);
    }
    json.push('tasks:');
    let data = [];
    for (let key in props.tasks) {
      if (!data.includes(props.tasks[key].label + ': ' + props.tasks[key].classes + '\n')) {
        data.push(props.tasks[key].label + ': ' + props.tasks[key].classes + '\n');
      }
      json.push([
        props.tasks[key].id,
        props.tasks[key].resourceId,
        props.tasks[key].label,
        props.tasks[key].from,
        props.tasks[key].to,
        props.tasks[key].classes
      ]);
    }
    let newJson = [];
    for (let i = 0; i < json.length; i++) {
      let newEntry = json[i] + '\n';
      newJson.push(newEntry);
    }
    setJsonFile(newJson);
    setLabels(data);
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

  const applyJsonChanges = () => {
    let element = document.getElementById('json-display').innerHTML;
    let newJson = element.split('\n');
    let oldLabels = [];
    let changes = [];
    for (let i = 0; i < newJson.lastIndexOf('rows: '); i++) {
      for (let j in labels) {
        if (!oldLabels.includes(labels[j].trim('\n'))) {
          oldLabels.push(labels[j].slice(0, -1));
        }
      }
    }
    let replacedLabel = '';
    let newLabel = '';
    for (let i = 0; i < newJson.indexOf('rows: '); i++) {
      if (!oldLabels.includes(newJson[i])) {
        replacedLabel = labels[i];
        labels[i] = newJson[i] + '\n';
        newLabel = labels[i].slice(0, labels[i].indexOf(':'));
      }
      for (let j = newJson.lastIndexOf('tasks:') + 1; j < newJson.length - 1; j++) {
        let task = newJson[j].split(',');
        if (task[2] === replacedLabel.slice(0, replacedLabel.indexOf(':'))) {
          task[2] = newLabel;
          newJson[j] = task.toString();
        }
      }
    }

    for (let i = newJson.indexOf('rows:'); i < newJson.length; i++) {
      newJson[i] = newJson[i] + '\n';
    }
    let newJsonWithoutLabels = newJson.slice(newJson.indexOf('rows: \n'), newJson.length - 1);
    setJsonFile(newJsonWithoutLabels);
    for (let i in labels) {
      if (labels[i] === '') {
        labels.splice(i, 1);
      }
    }
    for (let i in oldLabels) {
      if (oldLabels[i] === '') {
        oldLabels.splice(i, 1);
      }
    }
    let newRows = [];
    let newTasks = [];
    for (let i = newJson.lastIndexOf('rows: \n') + 1; i < newJson.indexOf('tasks:\n'); i++) {
      let newRow = {};
      newRow.id = newJson[i].split(',')[0].trim('\n');
      newRow.label = newJson[i].split(',')[1].trim('\n');
      newRows.push(newRow);
    }

    let labelsList = [];
    for (let j in labels) {
      let label = labels[j].slice(0, labels[j].indexOf(':'));
      labelsList.push(label);
    }
    for (let i = newJson.lastIndexOf('tasks:\n') + 1; i < newJson.length - 1; i++) {
      let newTask = {};
      let task = newJson[i].split(',');
      newTask.id = task[0];
      newTask.resourceId = parseInt(task[1]);
      newTask.label = task[2];
      newTask.from = moment(task[3]);
      newTask.to = moment(task[4]);
      newTask.classes = task[5].trim('\n');
      newTasks.push(newTask);
    }

    for (let i = 0; i < newRows.length; i++) {
      if (newRows[i].id !== props.rows[i].id) {
        console.log(props.rows[i]);
        changes.push(newRows[i]);
        console.log(changes);
      } else if (newRows[i].label !== props.rows[i].label) {
        console.log(props.rows[i]);
        changes.push(newRows[i]);
        console.log(changes);
      }
    }
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id !== props.tasks[i].id) {
        console.log(props.tasks[i]);
        changes.push(newTasks[i]);
        console.log(changes);
      } else if (newTasks[i].resourceId !== parseInt(props.tasks[i].resourceId)) {
        console.log(props.tasks[i]);
        changes.push(newTasks[i]);
        console.log(changes);
      } else if (newTasks[i].label !== props.tasks[i].label) {
        console.log(props.tasks[i]);
        changes.push(newTasks[i]);
        console.log(changes);
      } else if (!newTasks[i].from.isSame(props.tasks[i].from)) {
        console.log(props.tasks[i]);
        changes.push(newTasks[i]);
        console.log(changes);
      } else if (!newTasks[i].to.isSame(props.tasks[i].to)) {
        console.log(props.tasks[i]);
        changes.push(newTasks[i]);
        console.log(changes);
      } else if (newTasks[i].classes !== props.tasks[i].classes) {
        console.log(props.tasks[i]);
        changes.push(newTasks[i]);
        console.log(changes);
      }
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
          <button
            type="button"
            className="gantt-control-button"
            onClick={() => setToggleJson(!toggleJson)}
          >
            Edit JSON
          </button>
          <pre
            id="json-display"
            style={toggleJson === false ? { display: 'none' } : { display: 'block' }}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {labels}
            {jsonFile}
          </pre>
          <button
            type="button"
            className="gantt-control-button"
            style={toggleJson === false ? { display: 'none' } : { display: 'block' }}
            onClick={applyJsonChanges}
          >
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
