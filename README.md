# Project 3b Workforce Planning Documentation
  
## Table of Contents

1. [Overview](#overview)
2. [Building The Project]( #building-the-project)
3. [Backend](#backend)

## Overview

Frontend dependancies installed using `npm install`

| Name | Description |
| - | - |
| Material-UI  | Styling library used to make the display more appealing. |
| Moments  | Data object to store timedate data.  |
| React  | Used to initialise and build the project.   |
| Redux  | State container for react to make the state and props easier to use.  |
| Svelte-gantt  | Component used to display the data and create the graph.  |

Backend dependancies installed using `npm install`

| Name | Description |
| - | - |
| Express | Data connection library ?* (Can't think how to word what express is) |
| Moments | Data object to store timedate data. |
| Morgan | Logging library used to log changes made to the database |
| Mongoose | MongoDB connection library. can be changed to other database connections (?*) |

## Building the Project

### Prerequisites

First, you'll need to install the dependency management tool:

- [`npm`](https://docs.npmjs.com/)

### Building and Running

To build and run the project, open a console in both the frontend and the backend directory and run the command `npm install` and wait for the install process to be completed. Once completed on both consoles run the command `npm start`.
  
> Note: Running `npm run build` is not necessary. Also, the Dockerfile (without the `prod` extension) can be used for local development.

 Below is a link to our deployed development version of the code:
 [https://workforce-planning.herokuapp.com/](https://workforce-planning.herokuapp.com/)

  

### Testing
#### Testing Instructions :
The  tests for front and back end must be run seperately. Therefore to run tests for frontend, you must be in the project-3b-frontend directory and to run tests for the back end you must be in the project-3b-backend.

1. Navigate to the correct directory. 
2. Open a console.
3. Run `npm install` to ensure you have all the correct packages and versions are correct.
4. Run `npm test` to run the tests.
5. Press <kbd>a</kbd> to run all the tests.


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

  

- The first JSON data is for the rows. The second JSON data is for the tasks.

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


## Backend

  

This directory contains code for the backend part of the application. The backend is written in

JavaScript using Node.js with Express.

  

## Building the Project

  

### Prerequisites

  

First, you'll need to install the dependency management tool:

  

- [`npm`](https://docs.npmjs.com/)

  

### Building and Running

  

In the project directory, run `npm install` to install the necessary packages. To run the

application in the development environment, run `npm run start:dev`.

  

> Note: `npm start` can also be run instead of `npm run start:dev`, however, this will not utilise

>  `nodemon` and hence the application will not be restarted automatically upon changes to the code.

> Also, the Dockerfile can be used for local development.

  

Link to the deployed API: [https://workforce-planning-api.herokuapp.com/](https://workforce-planning-api.herokuapp.com/)

  

### Testing

  

For the Node backend tests, make sure you have already run `npm install` and then `npm test` in

the project directory.

  

### Extending the Project

  

This backend API is using MongoDB. To extend this project, the MongoDB username, password, URL and

the database name will need to be changed. A template is given below:

  

```

mongodb+srv://<MONGODB_USERNAME>:<MONGODB_PASSWORD>@<MONGODB_URL>/<MONGODB_DB_NAME>?retryWrites=true&w=majority

```
