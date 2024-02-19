import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/posts';

//! Create a post
export const createPostAPI = async (postData) => {
  console.log(postData);
  const response = await axios.post(`${BASE_URL}/create`, {
    title: postData.title,
    description: postData.description
  });
  return response.data;
};
