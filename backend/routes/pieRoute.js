const express = require('express');
const { getPieChartData } = require('../controller/pieController');
const router = express.Router();

router.get('/', getPieChartData);

module.exports = router;
