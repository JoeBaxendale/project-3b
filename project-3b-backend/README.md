# Project 3b Backend

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
> `nodemon` and hence the application will not be restarted automatically upon changes to the code.
> Also, the Dockerfile can be used for local development.

Link to the deployed API:
[https://workforce-planning-api.herokuapp.com/](https://workforce-planning-api.herokuapp.com/)

### Testing

For the Node backend tests, make sure you have already run `npm install` and then `npm test` in
the project directory.

### Extending the Project

This backend API is using MongoDB. To extend this project, the MongoDB username, password, URL and
the database name will need to be changed. A template is given below:

```
mongodb+srv://<MONGODB_USERNAME>:<MONGODB_PASSWORD>@<MONGODB_URL>/<MONGODB_DB_NAME>?retryWrites=true&w=majority
```
