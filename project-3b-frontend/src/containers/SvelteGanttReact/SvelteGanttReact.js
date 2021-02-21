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
  const [defaultText, setDefaultText] = useState('');

  //let jsonFile = '';

  let errorMessage = null;
  let title = null;

  if (window.location.href.includes("FIELD_ENGINEER"))
  {
    title = "Engineers ";

  }
  else if(window.location.href.includes("TENNIS_COURT")) {
    title = "Tennis court ";
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
        json.push("rows: ");
        for (let key in resData.rows) {
          json.push([resData.rows[key].id, " " + resData.rows[key].label]);
          rows.push({
            ...resData.rows[key]
          });

        }
        json.push("tasks: ");
        for (let key in resData.tasks) {
        json.push([resData.tasks[key].id, resData.tasks[key].resourceId, resData.tasks[key].label,
          resData.tasks[key].from, resData.tasks[key].from, resData.tasks[key].to]);
        tasks.push({
          ...resData.tasks[key],
          from: moment(resData.tasks[key].from),
          to: moment(resData.tasks[key].to)
        });
      }
        setRows(rows);
        setTasks(tasks);
        let newJson = [];
        for(let i=0; i<(json.length);i++){
          let newEntry =  json[i]  + "\n"
          newJson.push(newEntry)

        }
        setJsonFile(newJson);
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


      tableHeaders: [{ title: title , property: 'label', width: 140, type: 'tree' }],
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
    let element = document.getElementsByClassName("json-display")[0];
    let defaultText = element.innerHTML;
    setDefaultText(defaultText);
    if(element.style.visibility == "visible") {
      element.style.visibility = "hidden"
    }else{
      element.style.visibility = "visible"
    }
  }

  const saveJsonChanges = () => {
    let newJson = document.getElementsByClassName("json-display")[0].innerHTML;
    let oldJson = defaultText;
    if(newJson !== oldJson){
      newJson = newJson.split("\n")
      oldJson = oldJson.split("\n")
      for(let i=0; i<newJson.length;i++){
        if(newJson[i] !== oldJson[i]){
          oldJson[i] = oldJson[i].split(",")
          newJson[i] = newJson[i].split(",")
          for(let j=0; j<newJson[i].length;j++){
            if(newJson[i][j] !== oldJson[i][j]){
              let saveID = oldJson[i][0]
              let saveRow = newJson[i]
            }
          }
        }
      }
    }
  }

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
          <button type="button" className="gantt-control-button" onClick={toggleJson}> Edit Json</button>
          <pre className="json-display" contentEditable={true} >
              {jsonFile}
          </pre>
          <button type="button" className="gantt-control-button" onClick={saveJsonChanges}>Submit Changes</button>
        </>
      )}
    </>
  );
};

export default SvelteGanttReact;
