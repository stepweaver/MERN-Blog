const express = require('express');
const multer = require('multer');
const postController = require('../../controllers/posts/postController');
const storage = require('../../utils/fileupload');

//! Create instance of multer
const upload = multer({ storage });

//! Create instance of express router
const postRouter = express.Router();

//* Create post
postRouter.post('/api/posts/create', upload.single('image'), postController.createPost);
//* List posts
postRouter.get('/api/posts', postController.getPosts);
//* Update post
postRouter.put('/api/posts/:postId', postController.updatePost);
//* Get post
postRouter.get('/api/posts/:postId', postController.getPostById);
//* Delete post
postRouter.delete('/api/posts/:postId', postController.deletePost);

module.exports = postRouter;
