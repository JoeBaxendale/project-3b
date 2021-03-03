import React, { useState, useEffect, useRef } from 'react';
import { SvelteGantt, SvelteGanttTable } from 'svelte-gantt';
import moment from 'moment';

import 'svelte-gantt/css/svelteGantt.css';
import './SvelteGanttReact.css';

const SvelteGanttReact = props => {
  const divRef = useRef(null);
  const svelteGanttRef = useRef(null);

  const currentStart = moment('00:00', 'HH:mm');
  const currentEnd = moment('23:59', 'HH:mm');

  const [rows, setRows] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [error, setError] = useState('');

  const [jsonFile, setJsonFile] = useState([]);
  const [labels, setLabels] = useState([]);
  let errorMessage = null;
  let title = null;

  if (window.location.href.includes('FIELD_ENGINEER')) {
    title = 'Engineers ';
  } else if (window.location.href.includes('TENNIS_COURT')) {
    title = 'Tennis court ';
  }

  useEffect(() => {
    fetch(`http://localhost:8080/getData/${props.location.pathname.split('/').pop()}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch data.');
        }
        return res.json();
      })
      .then(resData => {
        const rows = [];
        const tasks = [];
        const json = [];
        json.push('rows: ');
        for (let key in resData.rows) {
          json.push([resData.rows[key].id, ' ' + resData.rows[key].label]);
          rows.push({
            ...resData.rows[key]
          });
        }
        json.push('tasks:');
        let data = [];
        for (let key in resData.tasks) {
          if (!data.includes(resData.tasks[key].label + ': ' + resData.tasks[key].classes + '\n')) {
            data.push(resData.tasks[key].label + ': ' + resData.tasks[key].classes + '\n');
          }
          json.push([
            resData.tasks[key].id,
            resData.tasks[key].resourceId,
            resData.tasks[key].label,
            resData.tasks[key].from,
            resData.tasks[key].to,
            resData.tasks[key].classes
          ]);
          tasks.push({
            ...resData.tasks[key],
            from: moment(resData.tasks[key].from),
            to: moment(resData.tasks[key].to)
          });
        }
        setRows(rows);
        setTasks(tasks);
        let newJson = [];
        for (let i = 0; i < json.length; i++) {
          let newEntry = json[i] + '\n';
          newJson.push(newEntry);
        }
        setJsonFile(newJson);

        setLabels(data);
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      });
  }, [props.location.pathname]);

  errorMessage = <p>{error}</p>;

  useEffect(() => {
    // Cannot do anything without the div.
    if (!divRef.current) return;

    const options = {
      rows: rows,
      tasks: tasks,
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
  }, [rows, tasks, currentStart, currentEnd]);

  useEffect(() => {
    if (!svelteGanttRef.current) return;

    svelteGanttRef.current.api.tasks.on.changed(task => {
      fetch('http://localhost:8080/task', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movedTask: task[0].task.model,
          newRow:
            task[0].sourceRow.model !== task[0].targetRow.model ? task[0].targetRow.model : null
        })
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Could not update row!');
          }
          return res.json();
        })
        .then(resData => {
          console.log(resData);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

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
    if (element.style.visibility == 'visible') {
      element.style.visibility = 'hidden';
    } else {
      element.style.visibility = 'visible';
    }
  };

  const applyJsonChanges = () => {
    let element = document.getElementsByClassName('json-display')[0].innerHTML;
    let newJson = element.split('\n');
    let oldLabels = [];
    for (let i = 0; i < newJson.lastIndexOf('rows: '); i++) {
      for (let j in labels) {
        if (!oldLabels.includes(labels[j].trim('\n'))) {
          oldLabels.push(labels[j].slice(0, -1));
        }
      }
    }
    let replacedLabel = ''
    let newLabel = ''
    for(let i =0; i<newJson.indexOf('rows: ');i++) {
      if (!oldLabels.includes(newJson[i])) {
        replacedLabel = labels[i]
        labels[i] = newJson[i] + '\n'
        newLabel = labels[i].slice(0, labels[i].indexOf(':'))
      }
      for (let j = newJson.lastIndexOf('tasks:') + 1; j < newJson.length - 1; j++) {
        let task = newJson[j].split(',')
        if (task[2] === replacedLabel.slice(0, replacedLabel.indexOf(':'))) {
          task[2] = newLabel
          newJson[j] = task.toString()
        }
      }
    }

    for (let i = newJson.indexOf('rows:'); i < newJson.length; i++) {
      newJson[i] = newJson[i] + '\n';
    }
    let newJsonWithoutLabels = newJson.slice(newJson.indexOf('rows: \n'), newJson.length-1);
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
      let newRow = new Object();
      newRow.id = newJson[i].split(',')[0];
      newRow.label = newJson[i].split(',')[1];
      newRows.push(newRow);
    }

    let labelsList = [];
    for (let j in labels) {
      let label = labels[j].slice(0, labels[j].indexOf(':'));
      labelsList.push(label);
    }
    for (let i = newJson.lastIndexOf('tasks:\n') + 1; i < newJson.length - 1; i++) {
      let newTask = new Object();
      let task = newJson[i].split(',');
      newTask.id = task[0];
      newTask.resourceId = parseInt(task[1]);
      newTask.label = task[2];
      newTask.from = moment(task[3]);
      newTask.to = moment(task[4]);
      newTask.classes = task[5].trim('\n');
      newTasks.push(newTask);
    }
    setRows(newRows);
    setTasks(newTasks);
  };

  return (
    <>
      {error ? (
        errorMessage
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
            <button type="button" className="gantt-control-button" id="new-task">
              Add New Bar
            </button>
          </div>
          <div className="gantt-chart" ref={divRef} />
          <button type="button" className="gantt-control-button" onClick={toggleJson}>
            {' '}
            Edit Json
          </button>
          <pre className="json-display" contentEditable={true}>
            {labels}
            {jsonFile}
          </pre>
          <button type="button" className="gantt-control-button" onClick={applyJsonChanges}>
            Submit Changes
          </button>
        </>
      )}
    </>
  );
};

export default SvelteGanttReact;
