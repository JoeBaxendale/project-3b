# Project 3b Workforce Planning Black-Box Documentation

## Table of Contents

1. [Overview](#overview)
2. [Parsing Data to the Chart](#parsing-data-to-the-chart)
3. [Displaying Data on the Chart](#displaying-data-on-the-chart)
4. [Add New Bar](#add-new-bar)
5. [Receiving Data from the Chart](#receiving-data-from-the-chart)
6. [Save Changes from the Chart](#save-changes-from-the-chart)

### Overview

The purpose of this black-box documentation is to provide an explanation as to how to utilise the
Gantt chart component from this project i.e. displaying it, and also as an example, using it for a
new domain of work.

### Parsing Data to the Chart

The data used to render the chart must use the following schema/structure (either using JSON data
from an API or directly as React JSX):

**Row:**

> Row refers to a row on the chart and **not** a row in the database.

| Field   | Data Type | Description                                              |
| ------- | --------- | -------------------------------------------------------- |
| `id`    | Integer   | The ID of the row; every row needs to have a unique one. |
| `label` | String    | The label given to the row.                              |

**Task:**

Task refers to a bar on the chart.

| Field        | Data Type | Description                                                                  |
| ------------ | --------- | ---------------------------------------------------------------------------- |
| `id`         | String    | The ID of the task; every task needs to have a unique one.                   |
| `resourceId` | String    | The ID of the row that the tasks links to.                                   |
| `label`      | String    | The label given to the task.                                                 |
| `from`       | Date      | The start date and time of the task.                                         |
| `to`         | Date      | The end date and time of the task.                                           |
| `classes`    | String    | CSS classes to apply to the task. This is primarily used for the bar colour. |

### Displaying Data on the Chart

To initialise the Gantt chart component with the rows, tasks and other options, an `options` object
can be created as follows:

```javascript
const options = {
  rows: [],
  tasks: [],
  headers: [
    { unit: 'day', format: 'dddd D MMMM', sticky: true },
    { unit: 'hour', format: 'HH:mm', sticky: true }
  ],
  fitWidth: true,
  from: moment('00:00', 'HH:mm'),
  to: moment('23:59', 'HH:mm'),
  minWidth: 2050,
  tableHeaders: [{ title: 'Example Title', property: 'label', width: 140, type: 'tree' }],
  tableWidth: 240,
  ganttTableModules: [SvelteGanttTable],
  taskContent: task => `${task.label} ${task.from.format('HH:mm')}`
};
```

Example test data to put in the `rows` and `tasks` array can be found
[here](./README.md).

Other options for the Gantt chart can be set as can be seen above. This shows how customisable this
chart is. The different options can be viewed from the [Gantt chart library this project is
using](https://github.com/ANovokmet/svelte-gantt).

### Add New Bar

To change the labels being assigned to the draggable task input you must edit the `if` statement and
the `switch` statement in `SvelteGanttAddBar`.

The `if` statement must be changed to contain the ending of the URL relevant to your implementation.
An example can be seen below.

```javascript
if (lastPartOfUrl === 'FIELD_ENGINEER') { }
```

...changes to

```javascript
if (lastPartOfUrl === 'CAR_CHARGERS') { }
```

The `switch` statements must be edited to have the relevant labels for your implementation. An
example can be seen below.

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

...changes to

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
    dragButtonLabel = 'Out of Order';
    dragButtonClass = 'Bar3';
    break;
  default:
    dragButtonLabel = 'Task';
    dragButtonClass = 'Bar1';
}
```

When a new bar is created, an object needs to be created with keys which match those of a task
(detailed above). This is due to the system recognising the bars as tasks and attempting to call the
backend with the values added to the bar. Therefore, the values must be the same as the values you
want sending to the backend.

Below is an example of creating a `newBar` object:

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

The colours of the bars can be altered when placing them onto the chart by changing the colour in
the initialisation of the `SvelteGanntAddBar` component. Once the colours are changed in this
section, you must go back to the switch statement posted above and change the relevant colour.

```javascript
<SvelteGanttAddBar gantt={svelteGanttRef.current} colour="orange" />
```

### Receiving Data from the Chart

Upon detecting that a bar has been changed on the chart, whether this is a movement on the chart or
a completely new bar being added into the chart, the chart will call the updateTask function in the
backend system with the relevant data in the format in [parsing data to the
chart](#parsing-data-to-the-chart). At present this function simply saves the data to the database.
However, the user can alter this function to reformat the data into their required data format. The
function can then send the data to an external API or save straight into a database.

### Save Changes from the Chart

In order to save the changes from the chart's output, you must transform the data from the format
mentioned above into the format that you require for saving. This can be done either by having your
API reformat the data before sending it back to your original system, or by writing some functions
on the web page to reformat the data. This will likely be a case of inverting the changes you made
above in [parsing data to the chart](#parsing-data-to-the-chart).
