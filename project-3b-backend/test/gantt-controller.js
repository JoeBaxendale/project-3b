const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const Row = require('../models/row');
const Task = require('../models/task');
const GanttController = require('../controllers/gantt');

describe('Gantt Controller', function () {
  before(function (done) {
    mongoose
      .connect(
        'mongodb+srv://project-3b-user:UPNuanvNb7in5mse@cluster0.xvxxm.mongodb.net/test-project-3b?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
          useUnifiedTopology: true
        }
      )
      .then(result => {
        const fieldEngineerRow = new Row({
          label: 'Field Engineer Row Label',
          type: 'FIELD_ENGINEER',
          tasks: [],
          _id: '5c0f66b979af55031b347100'
        });
        fieldEngineerRow.save();
        const fieldEngineerTask = new Task({
          row: '5c0f66b979af55031b347100',
          label: 'Field Engineer Task Label',
          from: Date.now(),
          to: Date.now(),
          classes: 'green',
          _id: '5c0f66b979af55031b347200'
        });
        fieldEngineerTask.save();
        fieldEngineerRow.tasks.push(fieldEngineerTask);
        fieldEngineerRow.save();
        const tennisCourtRow = new Row({
          label: 'Tennis Court Row Label',
          type: 'TENNIS_COURT',
          tasks: [],
          _id: '5c0f66b979af55031b347101'
        });
        tennisCourtRow.save();
      })
      .then(() => {
        done();
      });
  });

  it('should throw an error with code 500 if accessing the database fails', function (done) {
    sinon.stub(Row, 'find');
    Row.find.throws();

    const req = {
      params: {
        ganttChartType: 'FIELD_ENGINEER'
      }
    };

    GanttController.getData(req, {}, () => {}).then(result => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      // Signal Mocha to wait for above two lines to execute before it treats this test case as
      // done.
      done();
    });

    Row.find.restore();
  });

  it('should send a response with valid rows and tasks for an exisiting type of Gantt chart', function (done) {
    const req = {
      params: {
        ganttChartType: 'FIELD_ENGINEER'
      }
    };
    const res = {
      statusCode: 500,
      rows: null,
      tasks: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.rows = data.rows;
        this.tasks = data.tasks;
      }
    };
    GanttController.getData(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.rows).to.have.length(1);
      expect(res.tasks).to.have.length(1);
      expect(res.tasks[0]).to.have.deep.property('label', 'Field Engineer Task Label');
      done();
    });
  });

  it('should add the created task to tasks array of the associated row', function (done) {
    const req = {
      body: {
        newBar: {
          id: 5000,
          label: 'New Task Label for Tennis Court Row',
          from: Date.now(),
          to: Date.now(),
          classes: 'blue',
          resourceId: '101'
        }
      }
    };
    const res = {
      status: function () {
        return this;
      },
      json: function () {}
    };

    GanttController.addBar(req, res, () => {})
      .then(savedRow => {
        expect(savedRow).to.have.property('tasks');
        expect(savedRow.tasks).to.have.length(1);
        expect(savedRow.tasks[0].id.toString().slice(-3)).to.equal('201');
        done();
      })
      .catch(done);
  });

  after(function (done) {
    Row.deleteMany({})
      .then(() => {
        return Task.deleteMany({});
      })
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
