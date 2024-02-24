require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require('./utils/connectDB');
const postRouter = require('./router/post/postRouter');
const userRouter = require('./router/user/userRouter');

//! Connect to the database
connectDB();

//! PORT
const PORT = 5000;

//! Middleware
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true
};

app.use(cors(corsOptions));

//! Route Handlers
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

//! Not found middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

//! Error handler middleware
app.use((err, req, res, next) => {
  const message = err.message || 'Something went wrong';
  const stack = err.stack;
  res.status(500).json({
    message,
    stack
  });
});

//! Start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
