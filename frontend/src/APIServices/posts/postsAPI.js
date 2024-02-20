import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/posts';

//! Create a post
export const createPostAPI = async (postData) => {
  const response = await axios.post(`${BASE_URL}/create`, {
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
