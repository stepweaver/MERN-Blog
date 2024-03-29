require('dotenv').config();
const cors = require('cors');
const passport = require('./utils/passport-config');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./utils/connectDB');
const postRouter = require('./router/post/postRouter');
const userRouter = require('./router/user/userRouter');
const categoryRouter = require('./router/category/categoryRouter');
const planRouter = require('./router/plan/planRouter');
const stripePaymentRouter = require('./router/stripePayment/stripePaymentRouter');

//! Connect to the database
connectDB();

//! PORT
const PORT = 5000;

//! -----Middlewares----- //
//* Body parser middleware
app.use(express.json());

//* Cors middleware
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true
};

app.use(cors(corsOptions));

//* Passport middleware
app.use(passport.initialize());

//* Cookie parser middleware
app.use(cookieParser());

//* Route Handlers
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/plans', planRouter);
app.use('/api/stripe', stripePaymentRouter);

//* Not found middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

//* Error handler middleware
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
