# Project 3b Workforce Extension Black Box Documentation

### Overview

An explanation as to how to display and implement a new domain of work into the application
i.e., the usage of the gantt chart component. 

### Initialize Svelte-Gantt

To change the values being shown on the chart, you must change the inputs in 
``project-3b-frontend\src\containers\SvelteGanttReact\SvelteGanttReact.js`` 
Lines 43 and 44 from props.rows and props.tasks to the relevant input information. Some example 
inputs can be found here: https://git.cardiff.ac.uk/c1888037/project-3b/-/blob/black-box-documentation/project-3b-frontend/README.md#demoing-a-new-chart

Seen below is the code snippet that would need to be edited in order to change the chart.

```javascript
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
```

The above snippet can be used to change other sections of the chart such as: chart title, chart size, etc.

### Add New Bar


To change the labels being assigned to the draggable task input you must edit the if statement and the switch statement in
``project-3b-frontend\src\containers\SvelteGanttAddBar\SvelteGanttAddBar.js``.

The ``if`` statement must be changed to contain the ending of the url relevant to your implementation.
An example can be seen below.


```javascript
if (lastPartOfUrl === 'FIELD_ENGINEER') {};
```
changes to
```javascript
if (lastPartOfUrl === 'CAR_CHARGERS') {};
```

The ``switch`` statements must be edited to have the relevant labels for your implementation. An example can be seen below.
```javascript
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
```
changes to 
```javascript
switch (props.colour) {
  case 'orange':
    dragButtonLabel = 'Booked';
    dragButtonClass = 'Bar1';
    break;
  case 'green':
    dragButtonLabel = 'Available';
    dragButtonClass = 'Bar2';
    break;
  case 'blue':
    dragButtonLabel = 'Out Of Order';
    dragButtonClass = 'Bar3';
    break;
  default:
    dragButtonLabel = 'Task';
    dragButtonClass = 'Bar1';
}
```


When a new bar is created, values must be assigned to the bar which match those of a task.
This is due to the system recognising the bars as tasks and attempting to call the backend with the values added to the bar.
Therefore the values must be the same as the values you want sending to the backend.

Below is an example of setting the values of a new bar.

```javascript
 const id = 5000 + Math.floor(Math.random() * 1000);
         const newBar = {
           id,
           label: dragButtonLabel,
           from: date,
           to: date.clone().add(3, 'hour'),
           classes: props.colour,
           resourceId: row.model.id
         }; 
```


The colours of the bars can be altered when placing them onto the chart by changing the colour in the initialisation of the 
``SvelteGanntAddBar`` Objects *?.

Once the colours are changed in this section, you must also go back to the switch statement posted above and change the relevant colour.

```javascript
 <SvelteGanttAddBar gantt={svelteGanttRef.current} colour="orange" />
 ```
