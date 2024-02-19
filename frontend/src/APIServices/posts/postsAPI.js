import axios from 'axios';

const BASE_URL = 'https://localhost:5000/api/v1/posts/create';

//! Create a post
export const createPostAPI = async (postData) => {
  console.log(postData);
  const res = await axios.post(BASE_URL, { postData });
  return res.data;
};
