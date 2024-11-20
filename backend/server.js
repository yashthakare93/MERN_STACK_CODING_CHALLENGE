const express = require('express');
const connectDB = require('./config/db');  
const transactionRoutes = require('./routes/transactionRoute');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());  
app.use(express.json());  

// Routes
app.use('/api/transactions', transactionRoutes); 

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
