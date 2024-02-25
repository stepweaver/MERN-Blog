import { BASE_URL } from '../../utils/baseEndpoint';
import axios from 'axios';

//! Register a user
export const register = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    {
      username: userData?.username,
      password: userData?.password,
      email: userData?.email
    },
    {
      withCredentials: true
    }
  );

  return response.data;
};
