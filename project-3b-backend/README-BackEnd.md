
# Project 3b Backend

## Table of Contents

  

1. [Overview](#overview)
2. [Building The Project]( #building-the-project)
3. [Testing]( #backend-testing)
4. [Project Implementaion]( #implementing-the-project)
  
This directory contains code for the backend part of the application. The backend is written in JavaScript using Node.js with Express.

## Overview

Backend dependancies installed using `npm install`
| Name | Description |
| - | - |
| Express | Framework used for middlewares and routing. |
| Moments | Parse date and time. |
| Morgan | Logging library used to log HTTP requests. |
| Mongoose | Object Document Mapping library used to map between JS objects and MongoDB documents. |


## Building the Project

### Prerequisites

 
First, you'll need to install the dependency management tool:

- [`npm`](https://docs.npmjs.com/)

### Building and Running

To build and run the project, open a console in both the frontend and the backend directory and run the command `npm install` and wait for the install process to be completed. Once completed on both consoles run the command `npm start`.

> Note: Running `npm run build` is not necessary. Also, the Dockerfile (without the `prod` extension) can be used for local development.

Below is a link to our deployed development version of the code:
[https://workforce-planning.herokuapp.com/](https://workforce-planning.herokuapp.com/)

  

###  Backend Testing
  
1. Navigate to the Backend directory.
2. Open a console.
3. Run `npm install` to ensure you have all the correct packages and versions are correct.
4. Run `npm test` to run the tests.
5. Press <kbd>a</kbd> to run all the tests.

  

### Implementing the Project

A more detailed (blackbox) README for extending the project cant be found here: 

{extending the project}(#)

To implement this component you will have to create or modify the api that we have provided. The current API implementaion has a connection from the MongoDB database and you will be required to change it. A template for the connection is given below: 
```
mongodb+srv://<MONGODB_USERNAME>:<MONGODB_PASSWORD>@<MONGODB_URL>/<MONGODB_DB_NAME>?retryWrites=true&w=majority
```

The data coming out of the database must be in the format shown below otherwise the graph will not render the data. If the data is not in this format, you will need to create a transformation function. An example of a transformation and parsing the data to the graph can be seen in ``project-3b-backend/controllers/gantt.js`` inside the exports.getData function.

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
