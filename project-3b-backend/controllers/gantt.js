const moment = require('moment');

const Row = require('../models/row');
const Task = require('../models/task');

exports.getData = async (req, res, next) => {
  // Following commented out code populates the database (for initial view).
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

  //   let label = '';
  //   const colour = colours[(Math.random() * colours.length) | 0];

  //   switch (colour) {
  //     case 'orange':
  //       label = 'Absence';
  //       break;
  //     case 'green':
  //       label = 'Scheduled Shift';
  //       break;
  //     case 'blue':
  //       label = 'Overtime';
  //       break;
  //   }

  //   const task = new Task({
  //     _id: `5c0f66b979af55031b34720${i}`,
  //     row: row,
  //     label: label,
  //     from: moment(`${randomHour}:00`, 'HH:mm'),
  //     to: moment(`${randomHour + randomDay}:00`, 'HH:mm'),
  //     classes: colour
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

  //   let label = '';
  //   const colour = colours[(Math.random() * colours.length) | 0];

  //   switch (colour) {
  //     case 'orange':
  //       label = 'Not Available';
  //       break;
  //     case 'green':
  //       label = 'Available To Book';
  //       break;
  //     case 'blue':
  //       label = 'Tournament';
  //       break;
  //   }

  //   const task = new Task({
  //     _id: `5c0f66b979af55031b34720${i}`,
  //     row: row,
  //     label: label,
  //     from: moment(`${randomHour}:00`, 'HH:mm'),
  //     to: moment(`${randomHour + randomDay}:00`, 'HH:mm'),
  //     classes: colour
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
    return; // Added for testing
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err; // Added for testing
  }
};

exports.updateTask = async (req, res, next) => {
  const movedTask = req.body.movedTask;
  try {
    const task = await Task.findById(`5c0f66b979af55031b347${movedTask.id}`);
    if (!task) {
      const error = new Error('Task not found.');
      error.statusCode = 404;
      throw error;
    }

    // If the retrieved `newRoom` is null i.e. the row was not changed...
    if (!req.body.newRow) {
      task.from = movedTask.from;
      task.to = movedTask.to;
      await task.save();
      res.status(200).json({ message: 'Task updated.', task: task });
      return next();
    }

    // If the row was changed (and potentially the times of the task)...

    const oldRow = await Row.findById(task.row);
    const newRow = await Row.findById(`5c0f66b979af55031b347${req.body.newRow.id}`);

    oldRow.tasks.pull(task);
    await oldRow.save();
    newRow.tasks.push(task);
    await newRow.save();

    task.row = newRow;
    task.from = movedTask.from;
    task.to = movedTask.to;
    await task.save();

    res.status(200).json({ message: 'Task updated.', task: task });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addBar = async (req, res, next) => {
  const newBar = req.body.newBar;
  try {
    // Workaround to find next task ID.
    const latestTask = await Task.findOne({}, { _id: 1 }).sort({ createdAt: -1 });

    const task = new Task({
      _id: `5c0f66b979af55031b347${+latestTask.id.slice(-3) + 1}`,
      row: `5c0f66b979af55031b347${newBar.resourceId}`,
      label: newBar.label,
      from: newBar.from,
      to: newBar.to,
      classes: newBar.classes
    });

    await task.save();

    // Add the new bar/task to row's tasks array.
    const associatedRow = await Row.findById(`5c0f66b979af55031b347${newBar.resourceId}`);
    associatedRow.tasks.push(task);
    const savedRow = await associatedRow.save();

    res.status(200).json({ message: 'Task successfully added.', task: task });
    return savedRow; // Needed for testing
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
