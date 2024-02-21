import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/posts';

//! Create a post
export const createPost = async (postData) => {
  const response = await axios.post(`${BASE_URL}/create`, {
    title: postData.title,
    description: postData.description
  });
  return response.data;
};

//! Update a post
export const updatePost = async (postData) => {
  const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
    title: postData.title,
    description: postData.description
  });
  return response.data;
};

//! Get all posts
export const fetchAllPosts = async () => {
  const posts = await axios.get(`${BASE_URL}`);
  return posts.data;
};

//! Get a single post
export const fetchPost = async (postId) => {
  const post = await axios.get(`${BASE_URL}/${postId}`);
  return post.data;
};

// Delete a post
export const deletePost = async (postId) => {
  const response = await axios.delete(`${BASE_URL}/${postId}`);
  return response.data;
};
