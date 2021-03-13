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
          _id: '5c0f66b979af55031b34728a'
        });
        fieldEngineerRow.save();
        const tennisCourtRow = new Row({
          label: 'Tennis Court Row Label',
          type: 'TENNIS_COURT',
          tasks: [],
          _id: '5c0f66b979af55031b34728b'
        });
        tennisCourtRow.save();
        const fieldEngineerTask = new Task({
          row: '5c0f66b979af55031b34728a',
          label: 'Field Engineer Task Label',
          from: Date.now(),
          to: Date.now(),
          classes: 'green',
          _id: '5c0f66b979af55031b34729a'
        });
        fieldEngineerTask.save();
        fieldEngineerRow.tasks.push(fieldEngineerTask);
        fieldEngineerRow.save();
        const tennisCourtTask = new Task({
          row: '5c0f66b979af55031b34728b',
          label: 'Tennis Court Task Label',
          from: Date.now(),
          to: Date.now(),
          classes: 'green',
          _id: '5c0f66b979af55031b34729b'
        });
        tennisCourtTask.save();
        tennisCourtRow.tasks.push(tennisCourtTask);
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

  after(function (done) {
    Row.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
