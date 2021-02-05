import React, { useState, useEffect, useRef } from 'react';
import { SvelteGantt, SvelteGanttTable } from 'svelte-gantt';
import moment from 'moment';

import 'svelte-gantt/css/svelteGantt.css';
import './SvelteGanttReact.css';
import ModalConnector from '../ModalAddBar/ModalConector';

const SvelteGanttReact = props => {
  const divRef = useRef(null);
  const svelteGanttRef = useRef(null);

  const currentStart = moment('00:00', 'HH:mm');
  const currentEnd = moment('23:59', 'HH:mm');

  const [rows, setRows] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/getData/FIELD_ENGINEER')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch data.');
        }
        return res.json();
      })
      .then(resData => {
        const rows = [];
        const tasks = [];
        for (let key in resData.rows) {
          rows.push({
            ...resData.rows[key]
          });
        }
        for (let key in resData.tasks) {
          tasks.push({
            ...resData.tasks[key],
            from: moment(resData.tasks[key].from),
            to: moment(resData.tasks[key].to)
          });
        }
        setRows(rows);
        setTasks(tasks);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
      tableHeaders: [{ title: 'Engineers', property: 'label', width: 140, type: 'tree' }],
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
        { unit: 'day', format: 'dddd D MMMM' },
        { unit: 'hour', format: 'HH:mm' }
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
        { unit: 'month', format: 'MMMM YYYY' },
        { unit: 'day', format: 'ddd DD' }
      ]
    });
  };

  return (
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
        <ModalConnector/>
      </div>
      <div className="gantt-chart" ref={divRef} />
    </>
  );
};

export default SvelteGanttReact;
