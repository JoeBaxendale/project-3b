# Project 3b Workforce Extension Black Box Documentation

### Overview

An explanation as to how to display and implement a new domain of work into the application
i.e., the usage of the gantt chart component. 

### Initialize Svelte-Gantt

//Short explanation saying you can set the domain values of a gantt chart in the
`SvelteGantReact` component.

```javascript
 //code snippet of options function line 47-56
//((change props. to relevant demo chart code - See examples in white box))
```

### Add New Bar

//Short explanation saying you can set the labels of the new bar types to vary between 
different domains of work in the `SvelteGantAddBar` component. 

```javascript
//switch statement code snippet `
```

//Short explanation saying you can set the values of draggable bars on the gantt chart in
the `SvelteGantAddBar` component 

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

//Brief explanation of how classes variable are set in the variable colour which is set when `<SvelteGanttAddBar>` 
is called in the `SvelteGantReact` component.

```javascript
 <SvelteGanttAddBar gantt={svelteGanttRef.current} colour="orange" />
 ```
