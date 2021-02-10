const moment = require('moment');

const Row = require('../models/row');
const Task = require('../models/task');

exports.getData = async (req, res, next) => {
  // const engineerFirstRow = new Row({
  //   _id: '5c0f66b979af55031b347101',
  //   label: 'Field Engineer A',
  //   type: 'FIELD_ENGINEER'
  // });
  // const engineerSecondRow = new Row({
  //   _id: '5c0f66b979af55031b347102',
  //   label: 'Field Engineer B',
  //   type: 'FIELD_ENGINEER'
  // });
  // await engineerFirstRow.save();
  // await engineerSecondRow.save();
  // const engineerFirstTask = new Task({
  //   _id: '5c0f66b979af55031b347201',
  //   row: engineerFirstRow,
  //   label: 'Scheduled Shift',
  //   from: moment('07:00', 'HH:mm'),
  //   to: moment('09:00', 'HH:mm'),
  //   classes: 'orange'
  // });
  // const engineerSecondTask = new Task({
  //   _id: '5c0f66b979af55031b347202',
  //   row: engineerSecondRow,
  //   label: 'Scheduled Shift',
  //   from: moment('07:00', 'HH:mm'),
  //   to: moment('09:00', 'HH:mm'),
  //   classes: 'green'
  // });
  // await engineerFirstTask.save();
  // await engineerSecondTask.save();
  // engineerFirstRow.tasks.push(engineerFirstTask);
  // engineerSecondRow.tasks.push(engineerSecondTask);
  // await engineerFirstRow.save();
  // await engineerSecondRow.save();

  // const tennisFirstRow = new Row({
  //   _id: '5c0f66b979af55031b347103',
  //   label: 'Tennis Court A',
  //   type: 'TENNIS_COURT'
  // });
  // const tennisSecondRow = new Row({
  //   _id: '5c0f66b979af55031b347104',
  //   label: 'Tennis Court B',
  //   type: 'TENNIS_COURT'
  // });
  // const tennisThirdRow = new Row({
  //   _id: '5c0f66b979af55031b347105',
  //   label: 'Tennis Court C',
  //   type: 'TENNIS_COURT'
  // });
  // const tennisFourthRow = new Row({
  //   _id: '5c0f66b979af55031b347106',
  //   label: 'Tennis Court D',
  //   type: 'TENNIS_COURT'
  // });
  // const tennisFifthRow = new Row({
  //   _id: '5c0f66b979af55031b347107',
  //   label: 'Tennis Court E',
  //   type: 'TENNIS_COURT'
  // });
  // const tennisSixthRow = new Row({
  //   _id: '5c0f66b979af55031b347108',
  //   label: 'Tennis Court F',
  //   type: 'TENNIS_COURT'
  // });
  // await tennisFirstRow.save();
  // await tennisSecondRow.save();
  // await tennisThirdRow.save();
  // await tennisFourthRow.save();
  // await tennisFifthRow.save();
  // await tennisSixthRow.save();
  // const tennisFirstTask = new Task({
  //   _id: '5c0f66b979af55031b347203',
  //   row: tennisFirstRow,
  //   label: 'Scheduled Slot',
  //   from: moment('07:00', 'HH:mm'),
  //   to: moment('09:00', 'HH:mm'),
  //   classes: 'blue'
  // });
  // const tennisSecondTask = new Task({
  //   _id: '5c0f66b979af55031b347204',
  //   row: tennisSecondRow,
  //   label: 'Scheduled Slot',
  //   from: moment('08:00', 'HH:mm'),
  //   to: moment('10:00', 'HH:mm'),
  //   classes: 'orange'
  // });
  // const tennisThirdTask = new Task({
  //   _id: '5c0f66b979af55031b347205',
  //   row: tennisThirdRow,
  //   label: 'Scheduled Slot',
  //   from: moment('10:00', 'HH:mm'),
  //   to: moment('11:00', 'HH:mm'),
  //   classes: 'green'
  // });
  // const tennisFourthTask = new Task({
  //   _id: '5c0f66b979af55031b347206',
  //   row: tennisFourthRow,
  //   label: 'Scheduled Slot',
  //   from: moment('06:00', 'HH:mm'),
  //   to: moment('09:00', 'HH:mm'),
  //   classes: 'blue'
  // });
  // const tennisFifthTask = new Task({
  //   _id: '5c0f66b979af55031b347207',
  //   row: tennisFifthRow,
  //   label: 'Scheduled Slot',
  //   from: moment('08:00', 'HH:mm'),
  //   to: moment('10:00', 'HH:mm'),
  //   classes: 'orange'
  // });
  // const tennisSixthTask = new Task({
  //   _id: '5c0f66b979af55031b347208',
  //   row: tennisSixthRow,
  //   label: 'Scheduled Slot',
  //   from: moment('06:00', 'HH:mm'),
  //   to: moment('09:00', 'HH:mm'),
  //   classes: 'green'
  // });
  // await tennisFirstTask.save();
  // await tennisSecondTask.save();
  // await tennisThirdTask.save();
  // await tennisFourthTask.save();
  // await tennisFifthTask.save();
  // await tennisSixthTask.save();
  // tennisFirstRow.tasks.push(tennisFirstTask);
  // tennisSecondRow.tasks.push(tennisSecondTask);
  // tennisThirdRow.tasks.push(tennisThirdTask);
  // tennisFourthRow.tasks.push(tennisFourthTask);
  // tennisFifthRow.tasks.push(tennisFifthTask);
  // tennisSixthRow.tasks.push(tennisSixthTask);
  // await tennisFirstRow.save();
  // await tennisSecondRow.save();
  // await tennisThirdRow.save();
  // await tennisFourthRow.save();
  // await tennisFifthRow.save();
  // await tennisSixthRow.save();

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
