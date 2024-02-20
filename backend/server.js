require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const Post = require('./models/Post/Post');
const connectDB = require('./utils/connectDB');

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

//! Create post
app.post('/api/posts/create', async (req, res) => {
  try {
    // get the payload
    const postData = req.body;
    const postCreated = await Post.create(postData);
    res.json({
      status: 'success',
      message: 'Post created successfully',
      postCreated
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});
//! List posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      status: 'success',
      message: 'Posts retrieved successfully',
      posts
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});
//! Update post
//! Get post
//! Delete post
//! Start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
