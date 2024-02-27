const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post/Post');

const postController = {
  // @desc    Create a new post
  // @route   POST /api/posts/create
  // @access  Private
  createPost: asyncHandler(async (req, res) => {
    const { description } = req.body;

    const postCreated = await Post.create({
      description,
      image: req.file,
      author: req.user
    });

    res.json({
      status: 'success',
      message: 'Post created successfully',
      postCreated
    });
  }),

  // @desc    List all posts
  // @route   GET /api/posts
  // @access  Public
  getPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json({
      status: 'success',
      message: 'Posts retrieved successfully',
      posts
    });
  }),

  // @desc    Update a post
  // @route   PUT /api/posts/:postId
  // @access  Private
  updatePost: asyncHandler(async (req, res) => {
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
  }),

  // @desc    Get a post
  // @route   GET /api/posts/:postId
  // @access  Public
  getPostById: asyncHandler(async (req, res) => {
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
  }),

  // @desc    Delete a post
  // @route   DELETE /api/posts/:postId
  // @access  Private
  deletePost: asyncHandler(async (req, res) => {
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
};

module.exports = postController;
