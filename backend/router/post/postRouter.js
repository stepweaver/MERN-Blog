const express = require('express');
const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post/Post');

//! Create instance of express router
const postRouter = express.Router();

//* Create post
postRouter.post(
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
//* List posts
postRouter.get(
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
//* Update post
postRouter.put(
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
//* Get post
postRouter.get(
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
//* Delete post
postRouter.delete(
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

module.exports = postRouter;
