const express = require('express');

const ganttController = require('../controllers/gantt');

const router = express.Router();

router.get('/getData/:ganttChartType', ganttController.getData);

router.patch('/task', ganttController.updateTask);

module.exports = router;
