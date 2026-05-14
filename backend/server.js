require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Use Cloud Database if available, otherwise use local
const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/madhur_sweets';

mongoose.connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Database error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));