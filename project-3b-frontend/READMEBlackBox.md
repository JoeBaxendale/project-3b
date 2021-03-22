

# Project 3b Workforce Extension Black Box Documentation

### Table Of Contents
1. [Overview](#overview)
2. [Parsing Data to the Chart]( #parsing-data-to-the-chart)
3. [Displaying Data on the Chart]( #displaying-data-on-the-chart)
4. [Add New Bar]( #add-new-bar)
5. [Receiving Data from the Chart]( #receiving-data-from-the-chart)
6. [Save Changes from the Chart](#save-changes-from-the-chart)


### Overview

An explanation as to how to display and implement a new domain of work into the application    
i.e., the usage of the gantt chart component.

### Parsing data to the chart


The data parsed to the chart must be in a JSON format with the structure shown below:

Row refers to a row on the graph and NOT a row in the database.

**Row:**

| Name | Data Type | Description | Displayed |    
| - | - | - | - |    
| Label | String | The label given to the row | As row titles |    
| Tasks | Array of task object ID's | The ID's of tasks assigned to the row | No

Task refers to a bar on the chart.

**Task:**

| Name | Data Type | Description | Displayed |    
| - | - | - | - |    
| ID | String | Task ID | No |    
| ResourceID | String | RowID that the task will be displayed on | No |    
| Label | String | Title of the task | On task bar |    
| From | Date | Start time and date of the task | Left-most edge of task bar and on the bar |    
| To | Date | End time and date of the task | Right-most edge of task bar |    
| Classes | String | Extra information that is required for the graph rending. This is primarily used to parse bar colour.| No |

Due to this format being required to parse the data to the chart, the user is required tocreate either, an API that would reformat data and parse the data into the chart or a series of java script functions that would reformat the data on the webpage before parsing the data into the chart.

### Displaying data on the chart

To change the values being shown on the chart, you must change the inputs in     

``project-3b-frontend\src\containers\SvelteGanttReact\SvelteGanttReact.js`` Lines 43 and 44 from props.rows and props.tasks to the relevant input information. This can be the data you have parsed into the chart from above or you can manually enter some test data. An example test data input can be found here: https://git.cardiff.ac.uk/c1888037/project-3b/-/blob/black-box-documentation/project-3b-frontend/README.md#demoing-a-new-chart

Seen below is the code snippet that would need to be edited in order to change the chart.

```javascript const options = {  rows: props.rows,    
  tasks: props.tasks,    
  headers: [    
 { unit: 'day', format: 'dddd D MMMM', sticky: true },    
 { unit: 'hour', format: 'HH:mm', sticky: true }    
 ],  fitWidth: true,    
  from: currentStart,    
  to: currentEnd,    
  minWidth: 2050,    
  tableHeaders: [{ title: title, property: 'label', width: 140, type: 'tree' }],    
  tableWidth: 240,    
  ganttTableModules: [SvelteGanttTable],    
taskContent: task => `${task.label} ${task.from.format('HH:mm')}` }; 
```   

The above snippet can be used to change other sections of the chart such as: chart title, chart size, etc.

### Add new bar

To change the labels being assigned to the draggable task input you must edit the if statement and the switch statement in    
``project-3b-frontend\src\containers\SvelteGanttAddBar\SvelteGanttAddBar.js``.

The ``if`` statement must be changed to contain the ending of the url relevant to your implementation.    
An example can be seen below.


```javascript if (lastPartOfUrl === 'FIELD_ENGINEER') {}; ``` 
changes to  
```javascript if (lastPartOfUrl === 'CAR_CHARGERS') {}; ```  

The ``switch`` statements must be edited to have the relevant labels for your implementation. An example can be seen below.

```javascript switch (props.colour) {    
case 'orange':  dragButtonLabel = 'Absence';  dragButtonClass = 'Bar1'; break; case 'green':  dragButtonLabel = 'Scheduled Shift';  dragButtonClass = 'Bar2'; break; case 'blue':  dragButtonLabel = 'Overtime';  dragButtonClass = 'Bar3'; break; default:  dragButtonLabel = 'Task';  dragButtonClass = 'Bar1';} ``` changes to  
```javascript switch (props.colour) {    
case 'orange':  dragButtonLabel = 'Booked';  dragButtonClass = 'Bar1'; break; case 'green':  dragButtonLabel = 'Available';  dragButtonClass = 'Bar2'; break; case 'blue':  dragButtonLabel = 'Out Of Order';  dragButtonClass = 'Bar3'; break; default:  dragButtonLabel = 'Task';  dragButtonClass = 'Bar1';} ```   
  
When a new bar is created, values must be assigned to the bar which match those of a task.    
This is due to the system recognising the bars as tasks and attempting to call the backend with the values added to the bar.    
Therefore the values must be the same as the values you want sending to the backend.  
  
Below is an example of setting the values of a new bar.  
  
```javascript    
 const id = 5000 + Math.floor(Math.random() * 1000);    
 const newBar = {  id,    
  label: dragButtonLabel,    
  from: date,    
  to: date.clone().add(3, 'hour'),    
  classes: props.colour,    
  resourceId: row.model.id    
 }; ```    
    
 The colours of the bars can be altered when placing them onto the chart by changing the colour in the initialisation of the ``SvelteGanntAddBar`` Objects *?.    
 Once the colours are changed in this section, you must also go back to the switch statement posted above and change the relevant colour.    
 ```javascript    
 <SvelteGanttAddBar gantt={svelteGanttRef.current} colour="orange" />    
```

### Receiving data from the chart

Upon detecting that a bar has been changed on the chart, whether this is a movement on the chart or a completely new bar being added into the chart, the chart will call the updateTask function in the backend system with the relevant data in the format in [parsing data to the chart]( #parsing-data-to-the-chart).  At present this function simply saves the data to the database, however the user can alter this function to reformat the data into their required data format. The function can then send the data to an external API or save straight into a database.

### Save changes from the chart

In order to save the changes from the chart's output, you must transform the data from the format mentioned above into the format that you require for saving. This can be done either by having your API reformat the data before sending it back to your original system, or by writing some functions in the webpage to reformat the data. This will likely be a case of inverting the changes you made above in [parsing data to the chart]( #parsing-data-to-the-chart).  
  

