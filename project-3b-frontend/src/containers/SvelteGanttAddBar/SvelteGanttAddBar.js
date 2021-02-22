import React, { useEffect, useRef } from 'react';
import { SvelteGanttExternal } from 'svelte-gantt';
import classes from './SvelteGanttAddBar.module.css';

const SvelteGanttAddBar = props => {
  const newTaskRef = useRef(null);
  let bar1 = null;
  let bar2 = null;
  let bar3 = null;

  const { gantt } = props;
  if (window.location.href.includes('FIELD_ENGINEER')) {
    bar1 = 'Scheduled Shift';
    bar2 = 'Absence';
    bar3 = 'Over Time';
  } else if (window.location.href.includes('TENNIS_COURT')) {
    bar1 = 'Not Available';
    bar2 = 'Available to Book';
    bar3 = 'Tournament';
  }
  useEffect(() => {
    const external = new SvelteGanttExternal(newTaskRef.current, {
      gantt,
      onsuccess: (row, date, gantt) => {
        const id = 5000 + Math.floor(Math.random() * 1000);

        gantt.updateTask({
          id,
          label: `${bar1}`,
          from: date,
          to: date.clone().add(3, 'hour'),
          classes: 'orange',
          resourceId: row.model.id
        });
      }
    });
  }, []);

  return (
    <button type="button" ref={newTaskRef} className={classes.Bar1}>
      {bar1}
    </button>
  );
};

export default SvelteGanttAddBar;
