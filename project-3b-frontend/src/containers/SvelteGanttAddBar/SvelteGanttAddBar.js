import React, { useEffect, useRef } from 'react';
import { SvelteGanttExternal } from 'svelte-gantt';

//import classes from './SvelteGanttAddBar.module.css';

const SvelteGanttAddBar = props => {
  const newTaskRef = useRef(null);

  const { gantt } = props;

  useEffect(() => {
    const external = new SvelteGanttExternal(newTaskRef.current, {
      gantt,
      onsuccess: (row, date, gantt) => {
        console.log(row.model.id, date.format());
        const id = 5000 + Math.floor(Math.random() * 1000);
        gantt.updateTask({
          id,
          label: `Task #${id}`,
          from: date,
          to: date.clone().add(3, 'hour'),
          classes: 'orange',
          resourceId: row.model.id
        });
      },
      elementContent: () => {
        const element = document.createElement('div');
        element.innerHTML = 'New Task';
        element.className = 'sg-external-indicator';
        return element;
      }
    });
  }, []);

  console.log(gantt);

  return (
    <button type="button" ref={newTaskRef}>
      Orange - Drag to Gantt
    </button>
  );
};

export default SvelteGanttAddBar;
