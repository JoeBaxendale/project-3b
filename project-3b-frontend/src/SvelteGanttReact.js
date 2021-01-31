// import React, { Component } from 'react';
// import { SvelteGantt, SvelteGanttTable, SvelteGanttDependencies } from 'svelte-gantt';
// import moment from 'moment';

// import 'svelte-gantt/css/svelteGantt.css';
// import './SvelteGanttReact.css';

// class SvelteGanttReact extends Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//   }

//   componentDidMount() {
//     const node = this.myRef.current;
//     const gantt = new SvelteGantt({
//       // target a DOM element
//       target: node,
//       // svelte-gantt options
//       props: {
//         rows: [
//           { id: 1, label: 'Field Engineer A' },
//           { id: 2, label: 'Field Engineer B' }
//         ],
//         tasks: [
//           {
//             id: 1,
//             resourceId: 1,
//             label: 'Scheduled Shift',
//             from: moment('07:00', 'HH:mm'),
//             to: moment('09:00', 'HH:mm'),
//             classes: 'orange'
//           },
//           {
//             id: 2,
//             resourceId: 2,
//             label: 'Scheduled Shift',
//             from: moment('07:00', 'HH:mm'),
//             to: moment('09:00', 'HH:mm'),
//             classes: 'green'
//           }
//         ],
//         headers: [
//           { unit: 'day', format: 'dddd D MMMM' },
//           { unit: 'hour', format: 'HH:mm' }
//         ],
//         fitWidth: true,
//         from: moment('00:00', 'HH:mm'),
//         to: moment('12:00', 'HH:mm'),
//         tableHeaders: [{ title: 'Engineers', property: 'label', width: 140, type: 'tree' }],
//         tableWidth: 240,
//         ganttTableModules: [SvelteGanttTable],
//         ganttBodyModules: [SvelteGanttDependencies],
//         taskContent: task => `${task.label} ${task.from.format('HH:mm')}`
//       }
//     });
//   }

//   render() {
//     return (
//       <>
//         <div className="gantt-controls">
//           <button type="button" className="gantt-control-button" id="new-task">
//             Drag to Gantt
//           </button>
//         </div>
//         <div className="gantt-chart" ref={this.myRef} />
//       </>
//     );
//   }
// }

// export default SvelteGanttReact; // this is class-based code, below is functional

import React, { useState, useEffect, useRef } from 'react';
import { SvelteGantt, SvelteGanttTable, SvelteGanttDependencies } from 'svelte-gantt';
import moment from 'moment';

import 'svelte-gantt/css/svelteGantt.css';
import './SvelteGanttReact.css';

const SvelteGanttReact = props => {
  const ganttRef = useRef(null);

  const [gantt, setGantt] = useState(null);

  const currentStart = moment('00:00', 'HH:mm');
  const currentEnd = moment('12:00', 'HH:mm');

  const [rows, setRows] = useState([]);
  const [tasks, setTasks] = useState([]);

  const colours = ['blue', 'green', 'orange'];

  useEffect(() => {
    fetch('http://localhost:8080/getData')
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
        console.log('rows', rows);
        console.log('tasks', tasks);
        setRows(rows);
        setTasks(tasks);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const options = {
      rows: rows,
      tasks: tasks,
      headers: [
        { unit: 'day', format: 'dddd D MMMM' },
        { unit: 'hour', format: 'HH:mm' }
      ],
      fitWidth: true,
      from: currentStart,
      to: currentEnd,
      tableHeaders: [{ title: 'Engineers', property: 'label', width: 140, type: 'tree' }],
      tableWidth: 240,
      ganttTableModules: [SvelteGanttTable],
      ganttBodyModules: [SvelteGanttDependencies],
      taskContent: task => `${task.label} ${task.from.format('HH:mm')}`
    };

    console.log('running');

    setGantt(
      new SvelteGantt({
        // Targeting the DOM element.
        target: ganttRef.current,
        // `svelte-gantt` options.
        props: options
      })
    );
  }, [rows, tasks]);

  console.log(gantt);

  const onSetPreviousDay = () => {
    currentStart.subtract(1, 'day');
    currentEnd.subtract(1, 'day');
    gantt.$set({
      from: currentStart,
      to: currentEnd
    });
  };

  const onSetDayView = () => {
    gantt.$set({
      fitWidth: true,
      columnUnit: 'minute',
      columnOffset: 15,
      from: currentStart,
      to: currentEnd,
      minWidth: 1000,
      headers: [
        { unit: 'day', format: 'dddd D MMMM' },
        { unit: 'hour', format: 'HH:mm' }
      ]
    });
  };

  const onSetNextDay = () => {
    currentStart.add(1, 'day');
    currentEnd.add(1, 'day');
    gantt.$set({
      from: currentStart,
      to: currentEnd
    });
  };

  const onSetWeekView = () => {
    gantt.$set({
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
        <button type="button" className="gantt-control-button" id="new-task">
          Drag to Gantt
        </button>
      </div>
      <div className="gantt-chart" ref={ganttRef} />
    </>
  );
};

export default SvelteGanttReact;
