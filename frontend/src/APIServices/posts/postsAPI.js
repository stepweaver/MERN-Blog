import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/posts';

//! Create a post
export const createPost = async (postData) => {
  const response = await axios.post(`${BASE_URL}/create`, postData, {
    withCredentials: true
  });
  return response.data;
};

//! Update a post
export const updatePost = async (postData) => {
  const response = await axios.put(
    `${BASE_URL}/${postData?.postId}`,
    {
      title: postData.title,
      description: postData.description
    },
    {
      withCredentials: true
    }
  );
  return response.data;
};

//! Get all posts
export const getPosts = async (filters) => {
  const posts = await axios.get(BASE_URL, {
    params: filters
  });
  return posts.data;
};

//! Get a single post
export const fetchPost = async (postId) => {
  const post = await axios.get(`${BASE_URL}/${postId}`);
  return post.data;
};

//! Delete a post
export const deletePost = async (postId) => {
  const response = await axios.delete(`${BASE_URL}/${postId}`, {
    withCredentials: true
  });
  return response.data;
};
