const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/mainRoutes');
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();
app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


app.use('/api/',router);



app.listen(PORT,()=>{
    console.log('Connect to server!');
});