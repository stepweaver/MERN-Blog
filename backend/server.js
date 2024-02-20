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
    throw new Error(err);
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
    throw new Error(err);
  }
});
//! Update post
app.put('/api/posts/:postId', async (req, res) => {
  try {
    // get the post id from params
    const postId = req.params.postId;
    // find the post by id and update
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error('Post not found');
    }
    // update
    const postUpdated = await Post.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        description: req.body.description
      },
      { new: true }
    );
    res.json({
      status: 'success',
      message: 'Post updated successfully',
      postUpdated
    });
  } catch (err) {
    throw new Error(err);
  }
});
//! Get post
app.get('/api/posts/:postId', async (req, res) => {
  try {
    // get the post id from params
    const postId = req.params.postId;
    // find the post by id
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error('Post not found');
    }
    res.json({
      status: 'success',
      message: 'Post retrieved successfully',
      postFound
    });
  } catch (err) {
    throw new Error(err);
  }
});
//! Delete post
//! Start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
