const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const connectDB = require('../config/db');

const seedDatabase = async () => {
  try {
    await connectDB();

    await Transaction.deleteMany();

    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

    await Transaction.insertMany(data);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
