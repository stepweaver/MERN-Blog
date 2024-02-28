import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/categories';

//! Add a category
export const addCategory = async (category) => {
  const response = await axios.post(`${BASE_URL}/create`, category, {
    withCredentials: true
  });
  return response.data;
};

//! Get all categories
export const getCategories = async () => {
  const categories = await axios.get(`${BASE_URL}`);
  return categories.data;
};
