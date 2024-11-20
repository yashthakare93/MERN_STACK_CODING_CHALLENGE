const express = require('express');
const { listTransactions } = require('../controller/transactionController'); 
const router = express.Router();


router.get('/', listTransactions);  

module.exports = router;
