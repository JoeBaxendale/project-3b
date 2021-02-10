const moment = require('moment');

const Row = require('../models/row');
const Task = require('../models/task');

exports.getData = async (req, res, next) => {
  // const colours = ['blue', 'green', 'orange'];

  // for (let i = 0; i < 4; i++) {
  //   const randomHour = (Math.random() * 10) | 0;
  //   const randomDay = (Math.random() * 5) | (0 + 1);

  //   let row = new Row({
  //     _id: `5c0f66b979af55031b34710${i}`,
  //     label: 'Field Engineer ' + String.fromCharCode(65 + i),
  //     type: 'FIELD_ENGINEER'
  //   });

  //   await row.save();

  //   const task = new Task({
  //     _id: `5c0f66b979af55031b34720${i}`,
  //     row: row,
  //     label: 'Scheduled Shift',
  //     from: moment(`${randomHour}:00`, 'HH:mm'),
  //     to: moment(`${randomHour + randomDay}:00`, 'HH:mm'),
  //     classes: colours[(Math.random() * colours.length) | 0]
  //   });

  //   await task.save();
  //   row.tasks.push(task);
  //   await row.save();
  // }

  // for (let i = 4; i < 10; i++) {
  //   const randomHour = (Math.random() * 10) | 0;
  //   const randomDay = (Math.random() * 5) | (0 + 1);

  //   let row = new Row({
  //     _id: `5c0f66b979af55031b34710${i}`,
  //     label: 'Tennis Court ' + String.fromCharCode(65 + i),
  //     type: 'TENNIS_COURT'
  //   });

  //   await row.save();

  //   const task = new Task({
  //     _id: `5c0f66b979af55031b34720${i}`,
  //     row: row,
  //     label: 'Scheduled Slot',
  //     from: moment(`${randomHour}:00`, 'HH:mm'),
  //     to: moment(`${randomHour + randomDay}:00`, 'HH:mm'),
  //     classes: colours[(Math.random() * colours.length) | 0]
  //   });

  //   await task.save();
  //   row.tasks.push(task);
  //   await row.save();
  // }

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
