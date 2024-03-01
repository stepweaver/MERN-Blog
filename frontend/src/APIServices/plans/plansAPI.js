import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/plans';

//! Add a plan
export const createPlan = async (planData) => {
  const response = await axios.post(`${BASE_URL}/create`, planData, {
    withCredentials: true
  });
  return response.data;
};

//! Get all plans
export const getPlans = async () => {
  const plans = await axios.get(`${BASE_URL}`);
  return plans.data;
};

//! Get a single plan
export const getPlan = async (id) => {
  const plan = await axios.get(`${BASE_URL}/${id}`);
  return plan.data;
};
