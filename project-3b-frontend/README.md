# Project 3b Frontend

This directory contains code for the frontend part of the application. The frontend is written in
JavaScript using React.

## Building the Project

### Prerequisites

First, you'll need to install the dependency management tool:

- [`npm`](https://docs.npmjs.com/)

### Building and Running

In the project directory, run `npm install` to install the necessary packages and then `npm start`
to run the application.

> Note: Running `npm run build` is not necessary. Also, the Dockerfile (without the `prod`
> extension) can be used for local development.

### Deployment

Link to the deployed application:
[https://workforce-planning.herokuapp.com/](https://workforce-planning.herokuapp.com/)

The application is deployed using Heroku. When extending this project, the developer would need to:

1. Have their own Heroku account.
2. Create two applications in their Heroku instance - named `workforce-planning` for the frontend
   and `workforce-planning-api` for the backend.
3. Obtain the Heroku API key from
   [https://dashboard.heroku.com/account](https://dashboard.heroku.com/account) and put it in the
   CI/CD variables of the tool being used (e.g. GitLab, Jenkins, etc) with the key named as
   `HEROKU_TOKEN`.

### Testing

For the React frontend tests, make sure you have already run `npm install` and then `npm test` in
the project directory and press <kbd>a</kbd> to run all tests.

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
