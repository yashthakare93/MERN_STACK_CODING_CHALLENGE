const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controller/statisticController');


router.get('/', getStatistics);

module.exports = router;
