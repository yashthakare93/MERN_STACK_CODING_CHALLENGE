const express = require('express');
const connectDB = require('./config/db');  
const transactionRoute = require('./routes/transactionRoute');
const statisticRoute = require('./routes/statisticRoute');
const barRoute = require('./routes/barRoutes');
const pieRoute = require('./routes/pieRoute');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());  
app.use(express.json());  

// Routes
app.use('/api/transactions', transactionRoute); 
app.use('/api/statistics', statisticRoute);
app.use('/api/bar-chart', barRoute); 
app.use('/api/pie-chart', pieRoute);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
