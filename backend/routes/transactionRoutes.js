const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/transactions',async(req,res)=>{
    try{
        const transactions = await Transaction.find();
        res.json(transactions);
    }
    catch(err){
        res.status(500).json({message:'Server error Occurs'});
    }
})

module.exports = router;
