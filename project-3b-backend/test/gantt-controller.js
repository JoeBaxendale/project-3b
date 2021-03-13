const expect = require('chai').expect;
const sinon = require('sinon');

const Row = require('../models/row');
const GanttController = require('../controllers/gantt');

describe('Gantt Controller', function () {
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
});
