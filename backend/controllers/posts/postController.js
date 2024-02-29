const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post/Post');
const User = require('../../models/User/User');
const Category = require('../../models/Category/Category');
const postController = {
  //* @desc    Create a new post
  //* @route   POST /api/posts/create
  //* @access  Private
  createPost: asyncHandler(async (req, res) => {
    const { description, category } = req.body;

    const categoryFound = await Category.findById(category);
    if (!categoryFound) {
      throw new Error('Category not found');
    }

    const userFound = await User.findById(req.user);
    if (!userFound) {
      throw new Error('User not found');
    }

    const postCreated = await Post.create({
      description,
      image: req.file,
      author: req.user,
      category
    });

    categoryFound.posts.push(categoryFound?._id);
    await categoryFound.save();

    userFound.posts.push(postCreated?._id);
    await userFound.save();

    res.json({
      status: 'success',
      message: 'Post created successfully',
      postCreated
    });
  }),

  //* @desc    Get all posts
  //* @route   GET /api/posts
  //* @access  Public
  getPosts: asyncHandler(async (req, res) => {
    const { category, title, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.description = { $regex: title, $options: 'i' };
    }

    const posts = await Post.find(filter)
      .populate('category')
      .sort({
        createdAt: -1
      })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments(filter);

    res.json({
      status: 'success',
      message: 'Posts retrieved successfully',
      posts,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalPosts / limit)
    });
  }),

  //* @desc    Update a post
  //* @route   PUT /api/posts/:postId
  //* @access  Private
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

  //* @desc    Get a post
  //* @route   GET /api/posts/:postId
  //* @access  Public
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

  //* @desc    Delete a post
  //* @route   DELETE /api/posts/:postId
  //* @access  Private
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
