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

  const firstRow = new Row({ label: 'Tennis Court A', type: 'TENNIS_COURT' });
  const secondRow = new Row({ label: 'Tennis Court B', type: 'TENNIS_COURT' });
  const thirdRow = new Row({ label: 'Tennis Court C', type: 'TENNIS_COURT' });
  const fourthRow = new Row({ label: 'Tennis Court D', type: 'TENNIS_COURT' });
  const fifthRow = new Row({ label: 'Tennis Court E', type: 'TENNIS_COURT' });
  const sixthRow = new Row({ label: 'Tennis Court E', type: 'TENNIS_COURT' });
  await firstRow.save();
  await secondRow.save();
  await thirdRow.save();
  await fourthRow.save();
  await fifthRow.save();
  await sixthRow.save();
  const firstTask = new Task({
    row: firstRow,
    label: 'Scheduled Slot',
    from: moment('07:00', 'HH:mm'),
    to: moment('09:00', 'HH:mm'),
    classes: 'orange'
  });
  const secondTask = new Task({
    row: secondRow,
    label: 'Scheduled Slot',
    from: moment('08:00', 'HH:mm'),
    to: moment('10:00', 'HH:mm'),
    classes: 'green'
  });
  const thridTask = new Task({
    row: thirdRow,
    label: 'Scheduled Slot',
    from: moment('10:00', 'HH:mm'),
    to: moment('11:00', 'HH:mm'),
    classes: 'green'
  });
  const fourthTask = new Task({
    row: fourthRow,
    label: 'Scheduled Slot',
    from: moment('06:00', 'HH:mm'),
    to: moment('09:00', 'HH:mm'),
    classes: 'orange'
  });
  const fifthTask = new Task({
    row: fifthRow,
    label: 'Scheduled Slot',
    from: moment('08:00', 'HH:mm'),
    to: moment('10:00', 'HH:mm'),
    classes: 'orange'
  });
  const sixthTask = new Task({
    row: sixthRow,
    label: 'Scheduled Slot',
    from: moment('06:00', 'HH:mm'),
    to: moment('09:00', 'HH:mm'),
    classes: 'green'
  });
  await firstTask.save();
  await secondTask.save();
  await thirdTask.save();
  await fourthTask.save();
  await fifthTask.save();
  await sixthTask.save();
  firstRow.tasks.push(firstTask);
  secondRow.tasks.push(secondTask);
  thirdRow.tasks.push(thridTask);
  fourthRow.tasks.push(fourthTask);
  fifthRow.tasks.push(fifthTask);
  sixthRow.tasks.push(sixthTask);
  firstRow.save();
  secondRow.save();
  thirdRow.save();
  fourthRow.save();
  fifthRow.save();
  sixthRow.save();

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
