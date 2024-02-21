require('dotenv').config();
const cors = require('cors');
const asyncHandler = require('express-async-handler');
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
app.post(
  '/api/posts/create',
  asyncHandler(async (req, res) => {
    // get the payload
    const { title, description } = req.body;
    // find post by title
    const postFound = await Post.findOne({ title });
    if (postFound) {
      throw new Error('Post already exists');
    }
    // create post
    const postCreated = await Post.create({ title, description });
    res.json({
      status: 'success',
      message: 'Post created successfully',
      postCreated
    });
  })
);
//! List posts
app.get(
  '/api/posts',
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json({
      status: 'success',
      message: 'Posts retrieved successfully',
      posts
    });
  })
);
//! Update post
app.put(
  '/api/posts/:postId',
  asyncHandler(async (req, res) => {
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
  })
);
//! Get post
app.get(
  '/api/posts/:postId',
  asyncHandler(async (req, res) => {
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
  })
);
//! Delete post
app.delete(
  '/api/posts/:postId',
  asyncHandler(async (req, res) => {
    // get the post id from params
    const postId = req.params.postId;
    // find the post by id and delete
    const postFound = await Post.findByIdAndDelete(postId);
    if (!postFound) {
      throw new Error('Post not found');
    }
    res.json({
      status: 'success',
      message: 'Post deleted successfully',
      postFound
    });
  })
);

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
