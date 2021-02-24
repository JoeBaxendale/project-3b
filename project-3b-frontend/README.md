# Project 3b Frontend

This repository contains code for the frontend part of the application. The frontend is written in
JavaScript using React.

## Building the Project

### Prerequisites

First, you'll need to install the dependency management tool:

- [`npm`](https://docs.npmjs.com/)

### Building and Running

In the project directory, run `npm install` to install the necessary packages and then `npm start`
to run the application.

> Note: Running `npm run build` is not necessary.

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
