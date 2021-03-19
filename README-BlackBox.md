
# Project 3b Workforce Extension Documentation

## Table of Contents

1. [Overview](#overview)
2. [Implementation]( #Use-case-*?-Implementation)

## Overview

In this README, we will explain how to implement the component into another system and expand upon the components funtionality.

### Available Features 

| Name | Description |
| - | - |
| Daily Chart View| A 24hr view of the chart, showing all bars during the day. Current day is changeable |
| Weekly Chart View | A 7 day view of the chart, showing all bars during a week |
| Customiseable Rows| Customisable row labels for individual sets of data|
| Customiseable Bars | Customisable Bars for individual sets of data. Customisation includes labels, colours, times and dates |
| Editable JSON Display | Editable JSON display which shows how the data is being parsed into the component. This is able to be edited to change the data on the chart. This does not call the database functions and is solely for display purposes |
| Logging | Logging file which logs any changes to the data. Logging shows any changes to the data in the console |
| Demo New Chart | A section which allow you to input JSON data in a specific format in order to create a new chart. This chart does not save to the database. An example of the JSON data can be seen here: https://git.cardiff.ac.uk/c1888037/project-3b/-/tree/master/project-3b-frontend#demoing-a-new-chart |
| Draggable Bar Input | Bars can be dragged onto the chart from the options above. This will call a function to input them into the database|
| Data change functions | When data is changed or input, the chart will call a function which can be edited in the source code. This function is used to edit the data into a specific format for saving to the database. |
| Changeable Time Splits | Chart time splits are able to be extended or shortened. For example, in our Heroku version we have 15 minute time splits, however these could be changed to either hour or minute splits |
| - | - |
| - | - |

### Required Dependancies

| Name | Description |
| - | - |
| Material-UI | Styling library used to follow the Material UI design. |
| Moments | Parse date and time. |
| React | The library being used to create the frontend. |
| Redux | Tool to make it easier to pass state around the frontend application. |
| Svelte-gantt | Library extended upon to create the Gantt chart component. |
| Express | Framework used for middlewares and routing. |
| Morgan | Logging library used to log HTTP requests. |
| Mongoose | Object Document Mapping library used to map between JS objects and MongoDB documents. |

### Installation and Building

To install the above packages and start the project on a local machine, follow the instructions below:

1. Navigate to both the frontend and the backend directories
2. Open a terminal in both directories
3. On both terminals run the command ``npm install``
4. Once installed, run the command ``npm start``
5. The project will automatically open into your browser using localhost:8080

To deploy the project to a Heroku instance, follow the instructions below:

1. Create a Heroku account.
2. Create two new applications in the Heroku instance. 
2.1. Name one instance `workforce-planning` for the frontend of the project.
2.2. Name the other instance `workforce-planning-api` for the backend of the project.
3. Obtain the Heroku API key from [https://dashboard.heroku.com/account (https://dashboard.heroku.com/account) 
4. Using Gitlab, navigate to the `Settings-CI/CD-Variables`
5. Add the Heroku API key as a variable with the key `HEROKU_TOKEN`




## Use-case *? Implementation

For this project we have used a MongoDB database and we strongly reccomend MongoDB for your own implementation. 

#### To change to another MongoDB database:
1. Create your own instance of a MongoDB database
2. Create a connection to your MongoDB database. A template can be seen below:
`mongodb+srv://<MONGODB_USERNAME>:<MONGODB_PASSWORD>@<MONGODB_URL>/<MONGODB_DB_NAME>?retryWrites=true&w=majority`
3. Navigate to ``project-3b\project-3b-backend\app.js`` 
4. Replace the connection in mongoose.connect() with your own connection found in line 38 (as of writing this documentation)

#### *? To change to an SQL database:

#### Parsing data to the chart:

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

1. Navigate to `project-3b-backend\controllers\gantt.js` 
2. Edit the data to be in the format provided. You can do this in two ways:
2.1 Edit the data structure in the database to match the format
2.2 Edit the getData function to change the data into the format provided. This is dependant on how you have stored your data and therefore must be written accordingly.
3. Use the following code to send the data to the chart.
``res.status(200).json({``
``message: 'Fetched data successfully.',``
``rows: rows,``
``tasks: tasks``  
``});``
This is already implemented, however, if you decide to rewrite the function to change the format, this code will be required.

#### Accessing the Data Set:

Change the url
Have data in the database with the URL type 
# *? 

#### Changing the title:

1. Navigate to ``project-3b-frontend\src\containers\SvelteGanttReact\SvelteGanttReact.js``
2. Remove the following lines of code and manually set the title that you want for the chart.
`` let title = null;  ``
``if (lastPartOfUrl === 'FIELD_ENGINEER') {  ``
 `` title = 'Field Engineers';  ``
``} else if (lastPartOfUrl === 'TENNIS_COURT') {  ``
 `` title = 'Tennis Court';  ``
``}``
3. An example:
``let title = 'Wireless Car Charging' ``


#### To display the data:

At this step the format should be correct and therefore the data should automatically be displayed on the chart with all the features implemented.

#### To get data out of the chart:

 When editing data on the chart, it will send a function call to the function ``updateTask`` in the file
 ``project-3b-backend\controllers\gantt.js``. This function will throw errors if the task does not exist. For example, if the database connection has failed. This function can be edited in order to add functionality in between editing and writing to the database. An example of this functionality would be validation. 
To edit this function:
1. Navigate to ``project-3b\project-3b-backend\controllers\gantt.js`` 
2. Edit the function to implement the functionality you require

#### To change the data to a storable format:

1. Navigate to ``project-3b\project-3b-backend\controllers\gantt.js`` 
2. From here, you will have to edit the ``updateTask`` function, or create a new function which updateTask calls, to change the data format coming out of the chart, into a format that is suitable for storing in your database, if required.

#### To store the changes in the database:

Once the data is in a suitable format for saving to the database the code included in the ``updateTask`` function can be executed and the data will be saved to the database.

