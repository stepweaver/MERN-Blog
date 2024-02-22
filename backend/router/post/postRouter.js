const express = require('express');
const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post/Post');
const postController = require('../../controllers/posts/postController');

//! Create instance of express router
const postRouter = express.Router();

//* Create post
postRouter.post('/api/posts/create', postController.createPost);
//* List posts
postRouter.get('/api/posts', postController.getPosts);
//* Update post
postRouter.put('/api/posts/:postId', postController.updatePost);
//* Get post
postRouter.get('/api/posts/:postId', postController.getPostById);
//* Delete post
postRouter.delete('/api/posts/:postId', postController.deletePost);

module.exports = postRouter;
