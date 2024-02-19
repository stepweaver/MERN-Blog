const express = require('express');
const app = express();

const Post = require('./models/Post/Post');

//! PORT
const PORT = 5000;

//! Middleware
app.use(express.json());

//! Create post
app.post('/api/v1/posts/create', async (req, res) => {
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
//! Update post
//! Get post
//! Delete post
//! Start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
