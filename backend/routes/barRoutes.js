const express = require('express');
const router = express.Router();
const { getBarChartData } = require('../controller/barController');


router.get('/', getBarChartData);

module.exports = router;
