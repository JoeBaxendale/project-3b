const moment = require('moment');

const Row = require('../models/row');
const Task = require('../models/task');

exports.getData = async (req, res, next) => {
  // const firstRow = new Row({ label: 'Field Engineer A', type: 'FIELD_ENGINEER' });
  // const secondRow = new Row({ label: 'Field Engineer B', type: 'FIELD_ENGINEER' });
  // await firstRow.save();
  // await secondRow.save();
  // const firstTask = new Task({
  //   row: firstRow,
  //   label: 'Scheduled Shift',
  //   from: moment('07:00', 'HH:mm'),
  //   to: moment('09:00', 'HH:mm'),
  //   classes: 'orange'
  // });
  // const secondTask = new Task({
  //   row: secondRow,
  //   label: 'Scheduled Shift',
  //   from: moment('07:00', 'HH:mm'),
  //   to: moment('09:00', 'HH:mm'),
  //   classes: 'green'
  // });
  // await firstTask.save();
  // await secondTask.save();
  // firstRow.tasks.push(firstTask);
  // secondRow.tasks.push(secondTask);
  // firstRow.save();
  // secondRow.save();

  const ganttChartType = req.params.ganttChartType;

  try {
    const data = await Row.find({ type: ganttChartType }, { label: 1, tasks: 1 }).populate('tasks');

    if (!data.length) {
      const error = new Error('Could not find data for Gantt chart.');
      error.statusCode = 404;
      throw error;
    }

    const rows = data.map(row => ({
      id: row._id.toString().substr(-3),
      label: row.label
    }));

    const tasks = data.flatMap(row => {
      return row.tasks.map(task => ({
        id: task._id.toString().substr(-3),
        resourceId: task.row._id.toString().substr(-3),
        label: task.label,
        from: task.from,
        to: task.to,
        classes: task.classes
      }));
    });

    res.status(200).json({
      message: 'Fetched data successfully.',
      rows: rows,
      tasks: tasks
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
