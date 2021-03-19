# Project 3b Frontend

## Table of Contents

1. [Overview](#overview)
2. [Building The Project]( #building-the-project)
3. [Testing]( #frontend-testing)
4. [Project Implementaion]( #implementing-the-project)

This directory contains code for the frontend part of the application. The frontend is written in JavaScript using React.

## Overview

Frontend dependancies installed using `npm install`

| Name | Description |
| - | - |
| Material-UI | Styling library used to follow the Material UI design. |
| Moments | Parse date and time. |
| React | The library being used to create the frontend. |
| Redux | Tool to make it easier to pass state around the frontend application. |
| Svelte-gantt | Library extended upon to create the Gantt chart component. |

  

## Building the Project

### Prerequisites

First, you'll need to install the dependency management tool:
- [`npm`](https://docs.npmjs.com/)


### Building and Running

To build and run the project, open a console in both the frontend and the backend directory and run the command `npm install` and wait for the install process to be completed. Once completed on both consoles run the command `npm start`.

> Note: Running `npm run build` is not necessary. Also, the Dockerfile (without the `prod` extension) can be used for local development.

Below is a link to our deployed development version of the code: [https://workforce-planning.herokuapp.com/](https://workforce-planning.herokuapp.com/)


### Frontend Testing

1.  Navigate to the frontend directory.
2.  Open a console.
3.  Run `npm install` to ensure you have all the correct packages and versions are correct.
4.  Run `npm test` to run the tests.
5.  Press a to run all the tests.

### Other Notes

#### Demoing a New Chart

When demoing a new chart, a specific JSON scheme needs to followed, such as follows:

```json

[
{ "id": "1", "label": "Foo" },
{ "id": "2", "label": "Bar" },
{ "id": "3", "label": "Baz" },
{ "id": "4", "label": "Qux" }
]

```

  

```json
[
{
"id": "1",
"resourceId": "1",
"label": "Scheduled Shift",
"from": "2021-02-18T01:00:00.000Z",
"to": "2021-02-18T04:00:00.000Z",
"classes": "green"
},
{
"id": "2",
"resourceId": "2",
"label": "Absence",
"from": "2021-02-18T02:00:00.000Z",
"to": "2021-02-18T07:00:00.000Z",
"classes": "orange"
}
]

```

  

- The first set of JSON data is for the rows. The second set of JSON data is for the tasks.

- Every key and value needs to be in double quotation marks.

- The JSON data needs to be enclosed in square brackets like above.

- The `resourceId` needs to link to the `id` specified in the rows JSON data.

- For both the rows and the tasks, the `id` field needs to be unique.

- The format of the `from` and `to` fields needs to be like above.

- The `classes` field only accepts the following colours: orange, green or blue.

  

There is a known bug in which clicking 'Demo' sometimes may **not** render **all** the rows and
tasks, and only render the first one. In that case, as a workaround, you can drag the column which
displays the rows as follows:

  

![workaround]

  

[workaround]: https://i.stack.imgur.com/uOE8R.png

  

#### Gantt Chart Component

A limitation of the `svelte-gantt` library being used is that the ID of a row and a task (bar) needs
to be an integer. However, as this project is using MongoDB instead of another database such as
MySQL which has an auto-incrementing integer, you will see there are workarounds the application
(both the frontend and backend) contains.

  

The `SvelteGanttAddBar` component also contains a similar issue in which the ID of the new bar is
chosen at random as the `svelte-gantt` library requires it. However, when the newly added bar is
moved, an error is displayed in the console log. This is because the ID does not match what is
stored in MongoDB. A workaround for this specific case is to simply refresh the page when a bar/task
is added.

  

#### Edit JSON Feature

A known issue when using the edit JSON feature is that when a new bar is dragged onto the chart, the
editable JSON code being displayed is not updated. As a workaround, the page can be refreshed.
