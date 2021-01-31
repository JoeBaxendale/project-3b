const moment = require('moment');

exports.getData = async (req, res, next) => {
  res.status(200).json({
    rows: [
      { id: 1, label: 'Field Engineer A' },
      { id: 2, label: 'Field Engineer B' }
    ],
    tasks: [
      {
        id: 1,
        resourceId: 1,
        label: 'Scheduled Shift',
        from: moment('07:00', 'HH:mm'),
        to: moment('09:00', 'HH:mm'),
        classes: 'orange'
      },
      {
        id: 2,
        resourceId: 2,
        label: 'Scheduled Shift',
        from: moment('07:00', 'HH:mm'),
        to: moment('09:00', 'HH:mm'),
        classes: 'green'
      }
    ]
  });
};
