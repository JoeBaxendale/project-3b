import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { SvelteGanttExternal } from 'svelte-gantt';

import classes from './SvelteGanttAddBar.module.css';

const SvelteGanttAddBar = props => {
  const newTaskRef = useRef(null);

  const { gantt } = props;
  const lastPartOfUrl = props.location.pathname.split('/').pop();

  let dragButtonLabel = '';
  let dragButtonClass = '';

  if (lastPartOfUrl === 'FIELD_ENGINEER') {
    switch (props.colour) {
      case 'orange':
        dragButtonLabel = 'Absence';
        dragButtonClass = 'Bar1';
        break;
      case 'green':
        dragButtonLabel = 'Scheduled Shift';
        dragButtonClass = 'Bar2';
        break;
      case 'blue':
        dragButtonLabel = 'Overtime';
        dragButtonClass = 'Bar3';
        break;
      default:
        dragButtonLabel = 'Task';
        dragButtonClass = 'Bar1';
    }
  }
  if (lastPartOfUrl === 'TENNIS_COURT') {
    switch (props.colour) {
      case 'orange':
        dragButtonLabel = 'Available to Book';
        dragButtonClass = 'Bar1';
        break;
      case 'green':
        dragButtonLabel = 'Not Available';
        dragButtonClass = 'Bar2';
        break;
      case 'blue':
        dragButtonLabel = 'Tournament';
        dragButtonClass = 'Bar3';
        break;
      default:
        dragButtonLabel = 'Task';
        dragButtonClass = 'Bar1';
    }
  }

  useEffect(() => {
    const external = new SvelteGanttExternal(newTaskRef.current, {
      gantt,
      onsuccess: (row, date, gantt) => {
        const id = 5000 + Math.floor(Math.random() * 1000);
        gantt.updateTask({
          id,
          label: dragButtonLabel,
          from: date,
          to: date.clone().add(3, 'hour'),
          classes: props.colour,
          resourceId: row.model.id
        });
      }
    });
  }, [gantt, dragButtonLabel, props.colour]);

  return (
    <div>
      <button type="button" ref={newTaskRef} className={classes[dragButtonClass]}>
        {dragButtonLabel}
      </button>
    </div>
  );
};

export default withRouter(SvelteGanttAddBar);
