const express = require('express');
const multer = require('multer');
const postController = require('../../controllers/posts/postController');
const storage = require('../../utils/fileupload');

//! Create instance of multer
const upload = multer({ storage });

//! Create instance of express router
const postRouter = express.Router();

//* Create post
postRouter.post('/create', upload.single('image'), postController.createPost);
//* List posts
postRouter.get('/', postController.getPosts);
//* Update post
postRouter.put('/:postId', postController.updatePost);
//* Get post
postRouter.get('/:postId', postController.getPostById);
//* Delete post
postRouter.delete('/:postId', postController.deletePost);

module.exports = postRouter;
